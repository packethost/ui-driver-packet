"use strict";

define("nodes/components/driver-packet/component", ["exports", "shared/mixins/node-driver", "@rancher/ember-api-store/utils/fetch"], function (exports, _nodeDriver, _fetch) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogIHt7I2lmIChlcSBzdGVwIDEpfX0KICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgPGg0PgogICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFjY291bnRTZWN0aW9uIn19CiAgICA8L2g0PgoKICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucHJvamVjdElkLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNpbnB1dC1vci1kaXNwbGF5IGVkaXRhYmxlPShub3QgZGF0YUZldGNoZWQpIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWR9fQogICAgICAgIHt7aW5wdXQKICAgICAgICAgICAgICAgIHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICBuYW1lPSJ1c2VybmFtZSIKICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWQKICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSh0ICJub2RlRHJpdmVyLnBhY2tldC5wcm9qZWN0SWQucGxhY2Vob2xkZXIiKQogICAgICAgICAgICAgIH19CiAgICAgICAge3svaW5wdXQtb3ItZGlzcGxheX19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjaW5wdXQtb3ItZGlzcGxheSBlZGl0YWJsZT0obm90IGRhdGFGZXRjaGVkKSB2YWx1ZT1jb25maWcuYXBpS2V5IG9iZnVzY2F0ZT10cnVlfX0KICAgICAgICB7e2lucHV0CiAgICAgICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgICAgIG5hbWU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmFwaUtleQogICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9KHQgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5wbGFjZWhvbGRlciIpCiAgICAgICAgICAgICAgfX0KICAgICAgICB7ey9pbnB1dC1vci1kaXNwbGF5fX0KICAgICAgICA8cCBjbGFzcz0idGV4dC1pbmZvIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQuYXBpS2V5SGVscCIgaHRtbFNhZmU9dHJ1ZX19CiAgICAgICAgPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAge3tzYXZlLWNhbmNlbAogICAgICAgIGNyZWF0ZUxhYmVsPSJub2RlRHJpdmVyLnBhY2tldC5sb2dpbkFjdGlvbiIKICAgICAgICBzYXZpbmdMYWJlbD0ibm9kZURyaXZlci5wYWNrZXQuYXV0aGVudGljYXRpb24iCiAgICAgICAgc2F2ZT0oYWN0aW9uICJhdXRoUGFja2V0IikKICAgICAgICBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikKICAgICAgfX0KICB7e2Vsc2V9fQogIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPgogICAgPHNwYW4+CiAgICAgIHt7ZHJpdmVyT3B0aW9uc1RpdGxlfX0KICAgIDwvc3Bhbj4KICA8L2Rpdj4KCiAgPGRpdiBjbGFzcz0iYm94IG10LTIwIj4KICAgIDxoND57e3QgIm5vZGVEcml2ZXIucGFja2V0LmxvY2F0aW9uIn19PC9oND4KICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSBtdC0yMCI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5yZWdpb24ubGFiZWwifX0KICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTAiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcuZmFjaWxpdHkpIHZhbHVlPSJ0YXJnZXQudmFsdWUifX0+CiAgICAgICAgICB7eyNlYWNoIGZhY2lsaXR5Q2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLmNvZGV9fSBzZWxlY3RlZD17e2VxIGNvbmZpZy5mYWNpbGl0eUNvZGUgY2hvaWNlLmNvZGV9fT4KICAgICAgICAgICAge3tjaG9pY2UubmFtZX19CiAgICAgICAgICA8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgPGg0Pnt7dCAibm9kZURyaXZlci5wYWNrZXQuaW5zdGFuY2VPcHRpb25zU2VjdGlvbiJ9fTwvaDQ+CgogICAgPGRpdiBjbGFzcz0icm93IGlubGluZS1mb3JtIj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5pbWFnZS5sYWJlbCJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IGNvbmZpZy5vcykgdmFsdWU9InRhcmdldC52YWx1ZSJ9fT4KICAgICAgICAgIHt7I2VhY2ggb3NDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2Uuc2x1Z319IHNlbGVjdGVkPXt7ZXEgY29uZmlnLm9zIGNob2ljZS5zbHVnfX0+CiAgICAgICAgICAgIHt7Y2hvaWNlLm5hbWV9fQogICAgICAgICAgPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIERldmljZSBJbnN0YW5jZSBUeXBlCiAgICAgICAgPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uICJpbnN0YW5jZVR5cGVTZWxlY3RlZCIgdmFsdWU9InRhcmdldC52YWx1ZSJ9fT4KICAgICAgICAgIHt7I2VhY2ggZGV2aWNlVHlwZSBhcyB8dHlwZXx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e3R5cGUudmFsdWV9fSBzZWxlY3RlZD17e2VxIGNvbmZpZy5kZXZpY2VUeXBlIHR5cGUudmFsdWV9fT4KICAgICAgICAgICAge3t0eXBlLm5hbWV9fQogICAgICAgICAgPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBtdC0yMCI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgoKICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnNpemUubGFiZWwifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcucGxhbikgdmFsdWU9InRhcmdldC52YWx1ZSJ9fT4KICAgICAgICAgIHt7I2VhY2ggcGxhbkNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5zbHVnfX0gc2VsZWN0ZWQ9e3tlcSBjb25maWcucGxhbiBjaG9pY2Uuc2x1Z319PgogICAgICAgICAgICB7e2Nob2ljZS5uYW1lfX0KICAgICAgICAgICAge3sjaWYgY2hvaWNlLnByaWNpbmcuaG91cn19CiAgICAgICAgICAgICR7e2Nob2ljZS5wcmljaW5nLmhvdXJ9fSAvaHIKICAgICAgICAgICAge3tlbHNlfX0KICAgICAgICAgICAgJHt7Y2hvaWNlLnByaWNpbmcuZGF5fX0gL2RheQogICAgICAgICAgICB7ey9pZn19CiAgICAgICAgICA8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KCiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyBtdC0yMCI+CiAgICAgIDxoND57e3QgIm5vZGVEcml2ZXIucGFja2V0LnBsYW5EZXRhaWxzLmxhYmVsIn19PC9oND4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5wbGFuRGV0YWlscy5jcHUifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7I2VhY2ggcGxhbkNob2ljZURldGFpbHMuc3BlY3MuY3B1cyBhcyB8cGxhbnx9fQogICAgICAgIDxkaXY+CiAgICAgICAgICB7e3BsYW4uY291bnR9fSB7e3BsYW4udHlwZX19CiAgICAgICAgPC9kaXY+CiAgICAgICAge3svZWFjaH19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnBsYW5EZXRhaWxzLm1lbW9yeSJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAgPGRpdj4KICAgICAgICAgIHt7cGxhbkNob2ljZURldGFpbHMuc3BlY3MubWVtb3J5LnRvdGFsfX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucGxhbkRldGFpbHMuZHJpdmVzIn19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VEZXRhaWxzLnNwZWNzLmRyaXZlcyBhcyB8cGxhbnx9fQogICAgICAgIDxkaXY+CiAgICAgICAgICB7e3BsYW4uY291bnR9fSB7e3BsYW4uc2l6ZX19IHt7cGxhbi50eXBlfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7ey9lYWNofX0KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucGxhbkRldGFpbHMubmV0d29yayJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjZWFjaCBwbGFuQ2hvaWNlRGV0YWlscy5zcGVjcy5uaWNzIGFzIHxwbGFufH19CiAgICAgICAgPGRpdj4KICAgICAgICAgIHt7cGxhbi5jb3VudH19IHt7cGxhbi50eXBlfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7ey9lYWNofX0KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KCiAgPGRpdiBjbGFzcz0ib3Zlci1ociI+CiAgICA8c3Bhbj4KICAgICAge3t0ZW1wbGF0ZU9wdGlvbnNUaXRsZX19CiAgICA8L3NwYW4+CiAgPC9kaXY+CgogIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgICAgbW9kZWw9bW9kZWwKICAgICAgICBuYW1lUmVxdWlyZWQ9dHJ1ZQogICAgICAgIHJvd0NsYXNzPSJyb3cgbWItMTAiCiAgICAgIH19CgogIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgICBzZXRMYWJlbHM9KGFjdGlvbiAic2V0TGFiZWxzIikKICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgfX0KCiAge3tmb3JtLW5vZGUtdGFpbnRzCiAgICAgICAgbW9kZWw9bW9kZWwKICAgICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgfX0KCiAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICAgICAgbWFjaGluZT1tb2RlbAogICAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgICB9fQoKICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAge3tzYXZlLWNhbmNlbAogICAgICAgIHNhdmU9KGFjdGlvbiAic2F2ZSIpCiAgICAgICAgY2FuY2VsPShhY3Rpb24gImNhbmNlbCIpCiAgICAgICAgZWRpdGluZz1lZGl0aW5nCiAgICAgIH19CiAge3svaWZ9fQogIHt7L2FjY29yZGlvbi1saXN0fX0KPC9zZWN0aW9uPg==";
  var OS_WHITELIST = ['centos_7', 'coreos_stable', 'ubuntu_14_04', 'ubuntu_16_04', 'ubuntu_18_04', 'rancher'];
  var PLAN_BLACKLIST = ['baremetal_2a'];
  var DEFAULTS = {
    os: 'ubuntu_16_04',
    facilityCode: 'ewr1',
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
    driverName: 'packet',
    facilityChoices: null,
    planChoices: null,
    osChoices: null,
    step: 1,
    config: alias('model.packetConfig'),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-packet/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);

      setProperties(this, {
        facilityChoices: [],
        planChoices: [],
        osChoices: [],
        allOS: [],
        deviceType: [{
          name: "On Demand",
          value: "on-demand"
        }, {
          name: "Reserved",
          value: "reserved"
        }]
      });
    },
    actions: {
      authPacket: function authPacket(savedCB) {
        var _this = this;

        if (!this.validateAuthentication()) {
          savedCB(false);
          return;
        }

        var config = get(this, 'config');
        var promises = {
          plans: this.apiRequest('plans'),
          opSys: this.apiRequest('operating-systems'),
          facilities: this.apiRequest('facilities')
        };
        hash(promises).then(function (hash) {
          var osChoices = _this.parseOSs(hash.opSys.operating_systems);

          var selectedPlans = _this.parsePlans(osChoices.findBy('slug', 'ubuntu_16_04'), hash.plans.plans);

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
      },
      instanceTypeSelected: function instanceTypeSelected(type) {
        var config = get(this, 'config');

        switch (type) {
          case "on-demand":
            this.getOnDemandPlans();
            break;

          case "reserved":
            this.getReserverdHardwarePlans();
            break;

          default:
            this.getOnDemandPlans();
        }
      }
    },
    planChoiceDetails: computed('config.plan', function () {
      var planSlug = get(this, 'config.plan');
      var plan = get(this, 'allPlans').findBy('slug', planSlug);
      return plan;
    }),
    osObserver: on('init', observer('config.os', function () {
      this.notifyPropertyChange('config.facility');
    })),
    facilityObserver: on('init', observer('config.facility', function () {
      var facilities = get(this, 'facilityChoices');
      var slug = get(this, 'config.facility');
      var facility = facilities.findBy('code', slug);
      set(this, 'config.facilityCode', slug);
      var out = [];
      var allPlans = get(this, 'allPlans');

      if (allPlans && facility) {
        allPlans.forEach(function (plan) {
          plan.available_in.forEach(function (fac) {
            var facId = fac.href.split('/')[fac.href.split('/').length - 1];

            if (facility.id === facId) {
              out.push(plan);
            }
          });
        });
        if (out.length != 0) set(this, 'config.plan', out[0].slug);else {
          set(this, 'config.plan', "");
        }
        var currentOS = get(this, 'config.os');
        var osChoices = get(this, 'osChoices');
        var filteredByOs = this.parsePlans(osChoices.findBy('slug', currentOS), out);
        set(this, 'planChoices', filteredByOs);
      }
    })),
    bootstrap: function bootstrap() {
      var store = get(this, 'globalStore');
      var config = store.createRecord({
        type: 'packetConfig',
        projectId: '',
        apiKey: '',
        hwReservationId: '',
        deviceType: 'on-demand'
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
    getReserverdHardwarePlans: function getReserverdHardwarePlans() {
      var config = get(this, 'config');
      setProperties(config, {
        deviceType: 'reserved',
        hwReservationId: "next-available"
      });
      this.notifyPropertyChange('config.facility');
    },
    getOnDemandPlans: function getOnDemandPlans() {
      var config = get(this, 'config');
      setProperties(config, {
        deviceType: 'on-demand'
      });
      this.notifyPropertyChange('config.facility');
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

        if (plan && !PLAN_BLACKLIST.includes(loc) && !out.includes(plan)) {
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

      if (!get(this, 'config.plan') || get(this, 'config.plan') == "") {
        errors.push('Plan is requried');
      }

      if (errors.length) {
        set(this, 'errors', errors.uniq());
        return false;
      }

      return true;
    },
    validateAuthentication: function validateAuthentication() {
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