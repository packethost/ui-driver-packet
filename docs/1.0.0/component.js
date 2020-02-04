"use strict";

define("nodes/components/driver-packet/component", ["exports", "shared/mixins/node-driver", "@rancher/ember-api-store/utils/fetch", "./template"], function (exports, _nodeDriver, _fetch, _template) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var OS_WHITELIST = ['centos_7', 'coreos_stable', 'ubuntu_14_04', 'ubuntu_16_04', 'ubuntu_18_04', 'rancher'];
  var PLAN_BLACKLIST = ['baremetal_2a'];
  var DEFAULTS = {
    os: 'ubuntu_16_04',
    facilityCode: 'ewr1',
    plan: 'baremetal_0',
    billingCycle: 'hourly'
  };
  var hash = Ember.RSVP.hash;
  var on = Ember.on;
  var get = Ember.get;
  var setProperties = Ember.setProperties;
  var computed = Ember.computed;
  var observer = Ember.observer;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var isEmpty = Ember.isEmpty;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    layout: _template.default,
    driverName: 'packet',
    facilityChoices: null,
    planChoices: null,
    osChoices: null,
    step: 1,
    config: alias('model.packetConfig'),
    init: function init() {
      this._super.apply(this, arguments);

      setProperties(this, {
        facilityChoices: [],
        planChoices: [],
        osChoices: [],
        allOS: []
      });
    },
    actions: {
      authPacket: function authPacket(savedCB) {
        var _this = this;

        var promises = {
          plans: this.apiRequest('plans'),
          opSys: this.apiRequest('operating-systems'),
          facilities: this.apiRequest('facilities')
        };
        hash(promises).then(function (hash) {
          var osChoices = _this.parseOSs(hash.opSys.operating_systems);

          var selectedPlans = _this.parsePlans(osChoices.findBy('slug', 'ubuntu_14_04'), hash.plans.plans);

          var config = get(_this, 'config');
          setProperties(_this, {
            allOS: osChoices,
            allPlans: hash.plans.plans,
            step: 2,
            facilityChoices: hash.facilities.facilities,
            osChoices: osChoices,
            planChoices: selectedPlans
          });
          setProperties(config, DEFAULTS);
          savedCB(true);
        }, function (err) {
          var errors = get(_this, 'errors') || [];
          errors.push("".concat(err.statusText, ": ").concat(err.body.message));
          set(_this, 'errors', errors);
          savedCB(false);
        });
      }
    },
    planChoiceDetails: computed('config.plan', function () {
      var planSlug = get(this, 'config.plan');
      var plan = get(this, 'allPlans').findBy('slug', planSlug);
      return plan;
    }),
    facilityObserver: on('init', observer('config.facility', function () {
      var facilities = get(this, 'facilityChoices');
      var slug = get(this, 'config.facility');
      var facility = facilities.findBy('code', slug);
      var plans = get(this, 'allPlans');
      var out = [];

      if (plans && facility) {
        plans.forEach(function (plan) {
          plan.available_in.forEach(function (fac) {
            var facId = fac.href.split('/')[fac.href.split('/').length - 1];

            if (facility.id === facId) {
              out.push(plan);
            }
          });
        });
        set(this, 'planChoices', out);
      }
    })),
    bootstrap: function bootstrap() {
      var store = get(this, 'globalStore');
      var config = store.createRecord({
        type: 'packetConfig',
        projectId: '',
        apiKey: ''
      });
      var model = get(this, 'model');
      set(model, 'packetConfig', config);
    },
    apiRequest: function apiRequest(command, opt, out) {
      var _this2 = this;

      opt = opt || {};
      var url = "".concat(get(this, 'app.proxyEndpoint'), "/");

      if (opt.url) {
        url += opt.url.replace(/^http[s]?\/\//, '');
      } else {
        url += 'api.packet.net'.concat("/", command);
      }

      return (0, _fetch.default)(url, {
        headers: {
          'Accept': 'application/json',
          'X-Auth-Token': get(this, 'config.apiKey')
        }
      }).then(function (res) {
        var body = res.body;

        if (out) {
          out[command].pushObjects(body[command]);
        } else {
          out = body;
        }

        if (body && body.links && body.links.pages && body.links.pages.next) {
          opt.url = body.links.pages.next;
          return _this2.apiRequest(command, opt, out).then(function () {
            return out;
          });
        } else {
          return out;
        }
      });
    },
    parseOSs: function parseOSs(osList) {
      return osList.filter(function (os) {
        if (OS_WHITELIST.includes(os.slug) && !isEmpty(os.provisionable_on)) {
          return os;
        }
      });
    },
    parsePlans: function parsePlans(os, plans) {
      var out = [];
      os.provisionable_on.forEach(function (loc) {
        var plan = plans.findBy('slug', loc);

        if (plan && !PLAN_BLACKLIST.includes(loc)) {
          out.push(plan);
        }
      });
      return out;
    },
    validate: function validate() {
      var errors = get(this, 'model').validationErrors();

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
    }
  });
});;
"use strict";

define("ui/components/driver-packet/component", ["exports", "nodes/components/driver-packet/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});