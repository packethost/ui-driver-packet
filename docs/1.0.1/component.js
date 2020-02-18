"use strict";

define("nodes/components/driver-packet/component", ["exports", "shared/mixins/node-driver", "@rancher/ember-api-store/utils/fetch"], function (exports, _nodeDriver, _fetch) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogIHt7I2lmIChlcSBzdGVwIDEpfX0KICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgPGg0PgogICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFjY291bnRTZWN0aW9uIn19CiAgICA8L2g0PgoKICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucHJvamVjdElkLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNpbnB1dC1vci1kaXNwbGF5IGVkaXRhYmxlPShub3QgZGF0YUZldGNoZWQpIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWR9fQogICAgICAgIHt7aW5wdXQKICAgICAgICAgICAgICAgIHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICBuYW1lPSJ1c2VybmFtZSIKICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWQKICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSh0ICJub2RlRHJpdmVyLnBhY2tldC5wcm9qZWN0SWQucGxhY2Vob2xkZXIiKQogICAgICAgICAgICAgIH19CiAgICAgICAge3svaW5wdXQtb3ItZGlzcGxheX19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjaW5wdXQtb3ItZGlzcGxheSBlZGl0YWJsZT0obm90IGRhdGFGZXRjaGVkKSB2YWx1ZT1jb25maWcuYXBpS2V5IG9iZnVzY2F0ZT10cnVlfX0KICAgICAgICB7e2lucHV0CiAgICAgICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgICAgIG5hbWU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmFwaUtleQogICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9KHQgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5wbGFjZWhvbGRlciIpCiAgICAgICAgICAgICAgfX0KICAgICAgICB7ey9pbnB1dC1vci1kaXNwbGF5fX0KICAgICAgICA8cCBjbGFzcz0idGV4dC1pbmZvIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQuYXBpS2V5SGVscCIgaHRtbFNhZmU9dHJ1ZX19CiAgICAgICAgPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKICB7e3NhdmUtY2FuY2VsCiAgICAgICAgY3JlYXRlTGFiZWw9Im5vZGVEcml2ZXIucGFja2V0LmxvZ2luQWN0aW9uIgogICAgICAgIHNhdmluZ0xhYmVsPSJub2RlRHJpdmVyLnBhY2tldC5hdXRoZW50aWNhdGlvbiIKICAgICAgICBzYXZlPShhY3Rpb24gImF1dGhQYWNrZXQiKQogICAgICAgIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKQogICAgICB9fQogIHt7ZWxzZX19CiAgPGRpdiBjbGFzcz0ib3Zlci1ociBtYi0yMCI+CiAgICA8c3Bhbj4KICAgICAge3tkcml2ZXJPcHRpb25zVGl0bGV9fQogICAgPC9zcGFuPgogIDwvZGl2PgoKICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgPGg0Pnt7dCAibm9kZURyaXZlci5wYWNrZXQubG9jYXRpb24ifX08L2g0PgogICAgPGRpdiBjbGFzcz0icm93IGlubGluZS1mb3JtIG10LTIwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnJlZ2lvbi5sYWJlbCJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0xMCI+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IGNvbmZpZy5mYWNpbGl0eSkgdmFsdWU9InRhcmdldC52YWx1ZSJ9fT4KICAgICAgICAgIHt7I2VhY2ggZmFjaWxpdHlDaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2UuY29kZX19IHNlbGVjdGVkPXt7ZXEgY29uZmlnLmZhY2lsaXR5Q29kZSBjaG9pY2UuY29kZX19PgogICAgICAgICAgICB7e2Nob2ljZS5uYW1lfX0KICAgICAgICAgIDwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CgogIDxkaXYgY2xhc3M9ImJveCBtdC0yMCI+CiAgICA8aDQ+e3t0ICJub2RlRHJpdmVyLnBhY2tldC5pbnN0YW5jZU9wdGlvbnNTZWN0aW9uIn19PC9oND4KCiAgICA8ZGl2IGNsYXNzPSJyb3cgaW5saW5lLWZvcm0iPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmltYWdlLmxhYmVsIn19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgY29uZmlnLm9zKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIn19PgogICAgICAgICAge3sjZWFjaCBvc0Nob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5zbHVnfX0gc2VsZWN0ZWQ9e3tlcSBjb25maWcub3MgY2hvaWNlLnNsdWd9fT4KICAgICAgICAgICAge3tjaG9pY2UubmFtZX19CiAgICAgICAgICA8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgRGV2aWNlIEluc3RhbmNlIFR5cGUKICAgICAgICA8L2xhYmVsPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gImluc3RhbmNlVHlwZVNlbGVjdGVkIiB2YWx1ZT0idGFyZ2V0LnZhbHVlIn19PgogICAgICAgICAge3sjZWFjaCBkZXZpY2VUeXBlIGFzIHx0eXBlfH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7dHlwZS52YWx1ZX19IHNlbGVjdGVkPXt7ZXEgY29uZmlnLmRldmljZVR5cGUgdHlwZS52YWx1ZX19PgogICAgICAgICAgICB7e3R5cGUubmFtZX19CiAgICAgICAgICA8L29wdGlvbj4KICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgIDwvc2VsZWN0PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93IG10LTIwIj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQuc2l6ZS5sYWJlbCJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAobXV0IGNvbmZpZy5wbGFuKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIn19PgogICAgICAgICAge3sjZWFjaCBwbGFuQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLnNsdWd9fSBzZWxlY3RlZD17e2VxIGNvbmZpZy5wbGFuIGNob2ljZS5zbHVnfX0+CiAgICAgICAgICAgIHt7Y2hvaWNlLm5hbWV9fQogICAgICAgICAgICB7eyNpZiBjaG9pY2UucHJpY2luZy5ob3VyfX0KICAgICAgICAgICAgJHt7Y2hvaWNlLnByaWNpbmcuaG91cn19IC9ocgogICAgICAgICAgICB7e2Vsc2V9fQogICAgICAgICAgICAke3tjaG9pY2UucHJpY2luZy5kYXl9fSAvZGF5CiAgICAgICAgICAgIHt7L2lmfX0KICAgICAgICAgIDwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgoKICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93IG10LTIwIj4KICAgICAgPGg0Pnt7dCAibm9kZURyaXZlci5wYWNrZXQucGxhbkRldGFpbHMubGFiZWwifX08L2g0PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnBsYW5EZXRhaWxzLmNwdSJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjZWFjaCBwbGFuQ2hvaWNlRGV0YWlscy5zcGVjcy5jcHVzIGFzIHxwbGFufH19CiAgICAgICAgPGRpdj4KICAgICAgICAgIHt7cGxhbi5jb3VudH19IHt7cGxhbi50eXBlfX0KICAgICAgICA8L2Rpdj4KICAgICAgICB7ey9lYWNofX0KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucGxhbkRldGFpbHMubWVtb3J5In19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICA8ZGl2PgogICAgICAgICAge3twbGFuQ2hvaWNlRGV0YWlscy5zcGVjcy5tZW1vcnkudG90YWx9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5wbGFuRGV0YWlscy5kcml2ZXMifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7I2VhY2ggcGxhbkNob2ljZURldGFpbHMuc3BlY3MuZHJpdmVzIGFzIHxwbGFufH19CiAgICAgICAgPGRpdj4KICAgICAgICAgIHt7cGxhbi5jb3VudH19IHt7cGxhbi5zaXplfX0ge3twbGFuLnR5cGV9fQogICAgICAgIDwvZGl2PgogICAgICAgIHt7L2VhY2h9fQogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5wbGFuRGV0YWlscy5uZXR3b3JrIn19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VEZXRhaWxzLnNwZWNzLm5pY3MgYXMgfHBsYW58fX0KICAgICAgICA8ZGl2PgogICAgICAgICAge3twbGFuLmNvdW50fX0ge3twbGFuLnR5cGV9fQogICAgICAgIDwvZGl2PgogICAgICAgIHt7L2VhY2h9fQogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj4KICAgIDxzcGFuPgogICAgICB7e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX0KICAgIDwvc3Bhbj4KICA8L2Rpdj4KCiAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgICBtb2RlbD1tb2RlbAogICAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICAgICAgcm93Q2xhc3M9InJvdyBtYi0xMCIKICAgICAgfX0KCiAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscwogICAgICAgIHNldExhYmVscz0oYWN0aW9uICJzZXRMYWJlbHMiKQogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICB9fQoKICB7e2Zvcm0tbm9kZS10YWludHMKICAgICAgICBtb2RlbD1tb2RlbAogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICB9fQoKICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgICBtYWNoaW5lPW1vZGVsCiAgICAgICAgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsCiAgICAgIH19CgogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KICB7e3NhdmUtY2FuY2VsCiAgICAgICAgc2F2ZT0oYWN0aW9uICJzYXZlIikKICAgICAgICBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikKICAgICAgICBlZGl0aW5nPWVkaXRpbmcKICAgICAgfX0KICB7ey9pZn19CiAge3svYWNjb3JkaW9uLWxpc3R9fQo8L3NlY3Rpb24+";
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

        var config = get(this, 'config');
        var promises = {
          plans: this.apiRequest('plans'),
          opSys: this.apiRequest('operating-systems'),
          facilities: this.apiRequest('facilities'),
          hw_reserved_plans: this.apiRequest('projects/' + config.projectId + '/hardware-reservations')
        };
        hash(promises).then(function (hash) {
          var osChoices = _this.parseOSs(hash.opSys.operating_systems);

          var selectedPlans = _this.parsePlans(osChoices.findBy('slug', 'ubuntu_14_04'), hash.plans.plans);

          var allplansCombined = hash.plans.plans;
          var reservedPlans = [];

          for (var i = 0; i < hash.hw_reserved_plans.hardware_reservations.length; i++) {
            var _reserverdPlan = hash.hw_reserved_plans.hardware_reservations[i];
            _reserverdPlan.plan.available_in = [_reserverdPlan.facility];
            allplansCombined.push(_reserverdPlan.plan);
            reservedPlans.push(_reserverdPlan.plan);
          }

          setProperties(_this, {
            allOS: osChoices,
            allPlans: allplansCombined,
            step: 2,
            facilityChoices: hash.facilities.facilities,
            osChoices: osChoices,
            planChoices: selectedPlans,
            onDemandPlans: hash.plans.plans,
            reservedPlans: reservedPlans
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
    facilityObserver: on('init', observer('config.facility', function () {
      var facilities = get(this, 'facilityChoices');
      var slug = get(this, 'config.facility');
      var facility = facilities.findBy('code', slug);
      var out = [];
      var deviceType = get(this, 'config.deviceType');

      switch (deviceType) {
        case "on-demand":
          var onDemandPlans = get(this, 'onDemandPlans');

          if (onDemandPlans && facility) {
            onDemandPlans.forEach(function (plan) {
              plan.available_in.forEach(function (fac) {
                var facId = fac.href.split('/')[fac.href.split('/').length - 1];

                if (facility.id === facId) {
                  out.push(plan);
                }
              });
            });
            if (out.length != 0) set(this, 'config.plan', out[0].slug);else set(this, 'config.plan', {});
            set(this, 'planChoices', out);
          }

          break;

        case "reserved":
          var reservedPlans = get(this, 'reservedPlans');

          if (reservedPlans && facility) {
            reservedPlans.forEach(function (plan) {
              plan.available_in.forEach(function (fac) {
                var facId = fac.href.split('/')[fac.href.split('/').length - 1];

                if (facility.id === facId) {
                  out.push(plan);
                }
              });
            });
            if (out.length != 0) set(this, 'config.plan', out[0].slug);else set(this, 'config.plan', {});
            set(this, 'planChoices', out);
          }

          break;
      }
    })),
    bootstrap: function bootstrap() {
      var store = get(this, 'globalStore');
      var config = store.createRecord({
        type: 'packetConfig',
        projectId: '',
        apiKey: '',
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
        facility: config.facility
      });
      this.notifyPropertyChange('config.facility');
    },
    getOnDemandPlans: function getOnDemandPlans() {
      var config = get(this, 'config');
      setProperties(config, {
        deviceType: 'on-demand',
        facility: config.facility
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