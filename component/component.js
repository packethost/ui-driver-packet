import NodeDriver from 'shared/mixins/node-driver';
import fetch from '@rancher/ember-api-store/utils/fetch';
const LAYOUT;

const OS_WHITELIST = ['centos_7', 'coreos_stable', 'ubuntu_14_04', 'ubuntu_16_04', 'ubuntu_18_04', 'rancher'];
const PLAN_BLACKLIST = ['baremetal_2a']; // quick wheres james spader?
const DEFAULTS = {
  os: 'ubuntu_16_04',
  facilityCode: 'ewr1',
  billingCycle: 'hourly',
}
const hash = Ember.RSVP.hash;
const on = Ember.on;
const get = Ember.get;
const setProperties = Ember.setProperties;
const computed = Ember.computed;
const observer = Ember.observer;
const set = Ember.set;
const alias = Ember.computed.alias;
const isEmpty = Ember.isEmpty;

export default Ember.Component.extend(NodeDriver, {
  driverName: 'packet',
  facilityChoices: null,
  planChoices: null,
  osChoices: null,
  step: 1,

  config: alias('model.packetConfig'),

  init() {
    const decodedLayout = window.atob(LAYOUT);
    const template = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this, 'layout', template);
    this._super(...arguments);

    setProperties(this, {
      facilityChoices: [],
      planChoices: [],
      osChoices: [],
      allOS: [],
      deviceType: [{ name: "On Demand", value: "on-demand" }, { name: "Reserved", value: "reserved" }]
    });
  },

  actions: {
    authPacket(savedCB) {
      let config = get(this, 'config');
      let promises = {
        plans: this.apiRequest('plans'),
        opSys: this.apiRequest('operating-systems'),
        facilities: this.apiRequest('facilities'),
        hw_reserved_plans: this.apiRequest('projects/' + config.projectId + '/hardware-reservations'),
      };

      hash(promises).then((hash) => {
        let osChoices = this.parseOSs(hash.opSys.operating_systems);
        let selectedPlans = this.parsePlans(osChoices.findBy('slug', 'ubuntu_14_04'), hash.plans.plans);
        let allplansCombined = hash.plans.plans;
        let reservedPlans = []
        for (let i = 0; i < hash.hw_reserved_plans.hardware_reservations.length; i++) {
          let _reserverdPlan = hash.hw_reserved_plans.hardware_reservations[i]
          _reserverdPlan.plan.available_in = [_reserverdPlan.facility]
          allplansCombined.push(_reserverdPlan.plan);
          reservedPlans.push(_reserverdPlan.plan);
        }

        setProperties(this, {
          allOS: osChoices,
          allPlans: allplansCombined,
          step: 2,
          facilityChoices: hash.facilities.facilities,
          osChoices,
          planChoices: selectedPlans,
          onDemandPlans: hash.plans.plans,
          reservedPlans: reservedPlans,
        });

        setProperties(config, DEFAULTS);

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
  planChoiceDetails: computed('config.plan', function () {
    let planSlug = get(this, 'config.plan');
    let plan = get(this, 'allPlans').findBy('slug', planSlug);

    return plan;
  }),

  facilityObserver: on('init', observer('config.facility', function () {
    let facilities = get(this, 'facilityChoices');
    let slug = get(this, 'config.facility');
    let facility = facilities.findBy('code', slug);
    let out = [];
    let deviceType = get(this, 'config.deviceType');

    switch (deviceType) {
      case "on-demand":
        let onDemandPlans = get(this, 'onDemandPlans');
        if (onDemandPlans && facility) {
          onDemandPlans.forEach((plan) => {
            plan.available_in.forEach((fac) => {
              let facId = fac.href.split('/')[fac.href.split('/').length - 1];

              if (facility.id === facId) {
                out.push(plan);
              }
            })
          });
          if (out.length != 0)
            set(this, 'config.plan', out[0].slug)
          else
            set(this, 'config.plan', {})
          set(this, 'planChoices', out);
        }
        break;
      case "reserved":
        let reservedPlans = get(this, 'reservedPlans');
        if (reservedPlans && facility) {
          reservedPlans.forEach((plan) => {
            plan.available_in.forEach((fac) => {
              let facId = fac.href.split('/')[fac.href.split('/').length - 1];

              if (facility.id === facId) {
                out.push(plan);
              }
            })
          });
          if (out.length != 0)
            set(this, 'config.plan', out[0].slug)
          else
            set(this, 'config.plan', {})
          set(this, 'planChoices', out);
        }
        break;
    }

  })),

  bootstrap() {
    let store = get(this, 'globalStore');
    let config = store.createRecord({
      type: 'packetConfig',
      projectId: '',
      apiKey: '',
      deviceType: 'on-demand',
    });

    const model = get(this, 'model');

    set(model, 'packetConfig', config);
  },

  apiRequest(command, opt, out) {
    opt = opt || {};

    let url = `${get(this, 'app.proxyEndpoint')}/`;

    if (opt.url) {
      url += opt.url.replace(/^http[s]?\/\//, '');
    } else {
      url += `${'api.packet.net'}/${command}`;
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
      facility: config.facility,
    })
    this.notifyPropertyChange('config.facility');
  },

  getOnDemandPlans() {
    let config = get(this, 'config');
    setProperties(config, {
      deviceType: 'on-demand',
      facility: config.facility,
    })
    this.notifyPropertyChange('config.facility');
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

      if (plan && !PLAN_BLACKLIST.includes(loc)) {
        out.push(plan);
      }
    });

    return out;
  },

  validate() {
    let errors = get(this, 'model').validationErrors();

    if (!get(this, 'config.projectId')) {
      errors.push('Project ID is required');
    }

    if (!get(this, 'config.apiKey')) {
      errors.push('API Key is requried');
    }

    if (errors.length) {
      set(this, 'errors', errors.uniq());

      return false;
    }

    return true;
  },
});
