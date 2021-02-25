/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed = Ember.computed;
const get = Ember.get;
const set = Ember.set;
const alias = Ember.computed.alias;
const service = Ember.inject.service;
const observer = Ember.observer;
const hash = Ember.RSVP.hash;
const fetch = Ember.inject.service;
const on = Ember.on;
const setProperties = Ember.setProperties;
const isEmpty = Ember.isEmpty;

const defaultRadix = 10;
const defaultBase = 1024;
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/


const OS_WHITELIST = ['centos_7', 'coreos_stable', 'ubuntu_14_04', 'ubuntu_16_04', 'ubuntu_18_04', 'rancher'];
const PLAN_BLACKLIST = ['baremetal_2a']; // quick wheres james spader?
const DEFAULTS = {
  os: 'ubuntu_16_04',
  billingCycle: 'hourly',
}
const defaultFacility = "ewr1";

/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  step: 1,
  config: alias('model.%%DRIVERNAME%%Config'),
  app: service(),
  intl: service(),
  fetch: service(),
  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });

    set(this, 'layout', template);

    this._super(...arguments);

  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/
  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      projectId: '',
      apiKey: '',
      hwReservationId: '',
      deviceType: 'on-demand',
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    let errors = get(this, 'errors')||[];
    if ( !get(this, 'model.name') ) {
      errors.push('Name is required');
    }

    // Add more specific errors
    if (!get(this, 'config.projectId')) {
      errors.push('Project ID is required');
    }

    if (!get(this, 'config.apiKey')) {
      errors.push('API Key is requried');
    }

    if (!get(this, 'config.plan') || get(this, 'config.plan') == "") {
      errors.push('Plan is required');
    }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors.uniq());
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  validateAuthentication() {
    let errors = get(this, 'model').validationErrors();

    if (!get(this, 'config.projectId')) {
      errors.push('Project ID is required');
    }

    if (!get(this, 'config.apiKey')) {
      errors.push('API Key is required');
    }

    if (errors.length) {
      set(this, 'errors', errors.uniq());

      return false;
    }

    return true;
  },

  // Any computed properties or custom logic can go here
  actions: {
    authMetal(savedCB) {
      if (!this.validateAuthentication()) {
        savedCB(false);
        return;
      }

      let config = get(this, 'config');
      let promises = {
        plans: this.apiRequest('plans'),
        opSys: this.apiRequest('operating-systems'),
        facilities: this.apiRequest('facilities'),
      };

      let instanceType = get(this, 'config.hwReservationId')
      if (instanceType == "") {
        set(this, 'config.deviceType', 'on-demand')
      } else {
        set(this, 'config.deviceType', 'reserved')
      }

      hash(promises).then((hash) => {
        let osChoices = this.parseOSs(hash.opSys.operating_systems);
        let selectedPlans = this.parsePlans(osChoices.findBy('slug', 'ubuntu_16_04'), hash.plans.plans);

        setProperties(this, {
          allOS: osChoices,
          allPlans: hash.plans.plans,
          step: 2,
          facilityChoices: hash.facilities.facilities,
          osChoices,
          planChoices: selectedPlans,
          deviceType: [{ name: "On Demand", value: "on-demand" }, { name: "Reserved", value: "reserved" }]
        });

        setProperties(config, DEFAULTS);
        let facilityCode = get(this, 'config.facilityCode');
        if (!facilityCode) {
          set(this, 'config.facilityCode', defaultFacility)
        }
        savedCB(true);
      }, (err) => {
        let errors = get(this, 'errors') || [];
        errors.push(`${err.statusText}: ${err.body.message}`);

        set(this, 'errors', errors);
        savedCB(false);
      });
    },

    instanceTypeSelected(type) {
      let config = get(this, 'config');
      switch (type) {
        case "on-demand":
          this.getOnDemandPlans()
          break;
        case "reserved":
          this.getReserverdHardwarePlans()
          break;
        default:
          this.getOnDemandPlans()
      }


    },
  },
  facilityChoices: [],
  planChoices: [],
  osChoices: [],
  allOS: [],
  apiRequest(command, opt, out) {
    opt = opt || {};

    let url = `${get(this, 'app.proxyEndpoint')}/`;

    if (opt.url) {
      url += opt.url.replace(/^http[s]?\/\//, '');
    } else {
      url += `${'api.equinix.com/metal/v1'}/${command}`;
    }

    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Auth-Token': get(this, 'config.apiKey'),
      },
    }).then((res) => {
      let body = res.body;

      if (out) {
        out[command].pushObjects(body[command]);
      } else {
        out = body;
      }

      // De-paging
      if (body && body.links && body.links.pages && body.links.pages.next) {
        opt.url = body.links.pages.next;

        return this.apiRequest(command, opt, out).then(() => {
          return out;
        });
      } else {
        return out;
      }
    });
  },

  getReserverdHardwarePlans() {
    let config = get(this, 'config');
    setProperties(config, {
      deviceType: 'reserved',
      hwReservationId: 'next-available',
    })
    this.notifyPropertyChange('config.facilityCode');
  },

  getOnDemandPlans() {
    let config = get(this, 'config');
    setProperties(config, {
      deviceType: 'on-demand',
      hwReservationId: '',
    })
    console.log(config.hwReservationId)
    this.notifyPropertyChange('config.facilityCode');
  },

  parseOSs(osList) {
    return osList.filter((os) => {
      if (OS_WHITELIST.includes(os.slug) && !isEmpty(os.provisionable_on)) {
        return os;
      }
    });
  },

  parsePlans(os, plans) {
    let out = [];

    os.provisionable_on.forEach((loc) => {
      let plan = plans.findBy('slug', loc);

      if (plan && !PLAN_BLACKLIST.includes(loc) && !out.includes(plan)) {
        out.push(plan);
      }
    });

    return out;
  },
  planChoiceDetails: computed('config.plan', function () {
    let planSlug = get(this, 'config.plan');
    let plan = get(this, 'allPlans').findBy('slug', planSlug);

    return plan;
  }),

  osObserver: on('init', observer('config.os', function () {
    this.notifyPropertyChange('config.facility');
  })),

  facilityObserver: on('init', observer('config.facilityCode', function () {
    let facilities = get(this, 'facilityChoices');
    let slug = get(this, 'config.facilityCode');
    let facility = facilities.findBy('code', slug);
    set(this, 'config.facilityCode', slug)
    let out = [];
    let allPlans = get(this, 'allPlans');
    if (allPlans && facility) {
      allPlans.forEach((plan) => {
        plan.available_in.forEach((fac) => {
          let facId = fac.href.split('/')[fac.href.split('/').length - 1];

          if (facility.id === facId) {
            out.push(plan);
          }
        })
      });
      let currentOS = get(this, 'config.os');
      let osChoices = get(this, 'osChoices');
      let filteredByOs = this.parsePlans(osChoices.findBy('slug', currentOS), out);
      set(this, 'planChoices', filteredByOs);

      if (filteredByOs.length > 0)
        set(this, 'config.plan', filteredByOs[0].slug)
      else if (filteredByOs.length == 0) {
        set(this, 'config.plan', "")
      }
      //always set to baremetal_0 when available
      for (var i = 0; i < filteredByOs.length; i++) {
        if (filteredByOs[i].slug == 'baremetal_0') {
          set(this, 'config.plan', filteredByOs[i].slug)
          break;
        }
      }
    }
  })),
});
