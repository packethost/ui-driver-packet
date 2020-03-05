"use strict";

define("nodes/components/driver-packet/component", ["exports", "shared/mixins/node-driver", "@rancher/ember-api-store/utils/fetch"], function (exports, _nodeDriver, _fetch) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogIHt7I2lmIChlcSBzdGVwIDEpfX0KICA8ZGl2IGNsYXNzPSJib3ggbXQtMjAiPgogICAgPGg0PgogICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFjY291bnRTZWN0aW9uIn19CiAgICA8L2g0PgoKICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucHJvamVjdElkLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNpbnB1dC1vci1kaXNwbGF5IGVkaXRhYmxlPShub3QgZGF0YUZldGNoZWQpIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWR9fQogICAgICAgIHt7aW5wdXQKICAgICAgICAgICAgICAgIHR5cGU9InRleHQiCiAgICAgICAgICAgICAgICBuYW1lPSJ1c2VybmFtZSIKICAgICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5wcm9qZWN0SWQKICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPSh0ICJub2RlRHJpdmVyLnBhY2tldC5wcm9qZWN0SWQucGxhY2Vob2xkZXIiKQogICAgICAgICAgICAgIH19CiAgICAgICAge3svaW5wdXQtb3ItZGlzcGxheX19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjaW5wdXQtb3ItZGlzcGxheSBlZGl0YWJsZT0obm90IGRhdGFGZXRjaGVkKSB2YWx1ZT1jb25maWcuYXBpS2V5IG9iZnVzY2F0ZT10cnVlfX0KICAgICAgICB7e2lucHV0CiAgICAgICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgICAgIG5hbWU9InBhc3N3b3JkIgogICAgICAgICAgICAgICAgdmFsdWU9Y29uZmlnLmFwaUtleQogICAgICAgICAgICAgICAgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9KHQgIm5vZGVEcml2ZXIucGFja2V0LmFwaUtleS5wbGFjZWhvbGRlciIpCiAgICAgICAgICAgICAgfX0KICAgICAgICB7ey9pbnB1dC1vci1kaXNwbGF5fX0KICAgICAgICA8cCBjbGFzcz0idGV4dC1pbmZvIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQuYXBpS2V5SGVscCIgaHRtbFNhZmU9dHJ1ZX19CiAgICAgICAgPC9wPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKICB7e3RvcC1lcnJvcnMgZXJyb3JzPWVycm9yc319CiAge3tzYXZlLWNhbmNlbAogICAgICAgIGNyZWF0ZUxhYmVsPSJub2RlRHJpdmVyLnBhY2tldC5sb2dpbkFjdGlvbiIKICAgICAgICBzYXZpbmdMYWJlbD0ibm9kZURyaXZlci5wYWNrZXQuYXV0aGVudGljYXRpb24iCiAgICAgICAgc2F2ZT0oYWN0aW9uICJhdXRoUGFja2V0IikKICAgICAgICBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikKICAgICAgfX0KICB7e2Vsc2V9fQogIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPgogICAgPHNwYW4+CiAgICAgIHt7ZHJpdmVyT3B0aW9uc1RpdGxlfX0KICAgIDwvc3Bhbj4KICA8L2Rpdj4KCiAgPGRpdiBjbGFzcz0iYm94IG10LTIwIj4KICAgIDxoND57e3QgIm5vZGVEcml2ZXIucGFja2V0LmxvY2F0aW9uIn19PC9oND4KICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSBtdC0yMCI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5yZWdpb24ubGFiZWwifX0KICAgICAgICA8L2xhYmVsPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTAiPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcuZmFjaWxpdHlDb2RlKSB2YWx1ZT0idGFyZ2V0LnZhbHVlIn19PgogICAgICAgICAge3sjZWFjaCBmYWNpbGl0eUNob2ljZXMgYXMgfGNob2ljZXx9fQogICAgICAgICAgPG9wdGlvbiB2YWx1ZT17e2Nob2ljZS5jb2RlfX0gc2VsZWN0ZWQ9e3tlcSBjb25maWcuZmFjaWxpdHlDb2RlIGNob2ljZS5jb2RlfX0+CiAgICAgICAgICAgIHt7Y2hvaWNlLm5hbWV9fQogICAgICAgICAgPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KCiAgPGRpdiBjbGFzcz0iYm94IG10LTIwIj4KICAgIDxoND57e3QgIm5vZGVEcml2ZXIucGFja2V0Lmluc3RhbmNlT3B0aW9uc1NlY3Rpb24ifX08L2g0PgoKICAgIDxkaXYgY2xhc3M9InJvdyBpbmxpbmUtZm9ybSI+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQuaW1hZ2UubGFiZWwifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIDxzZWxlY3QgY2xhc3M9ImZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcub3MpIHZhbHVlPSJ0YXJnZXQudmFsdWUifX0+CiAgICAgICAgICB7eyNlYWNoIG9zQ2hvaWNlcyBhcyB8Y2hvaWNlfH19CiAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt7Y2hvaWNlLnNsdWd9fSBzZWxlY3RlZD17e2VxIGNvbmZpZy5vcyBjaG9pY2Uuc2x1Z319PgogICAgICAgICAgICB7e2Nob2ljZS5uYW1lfX0KICAgICAgICAgIDwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICBEZXZpY2UgSW5zdGFuY2UgVHlwZQogICAgICAgIDwvbGFiZWw+CiAgICAgICAgPHNlbGVjdCBjbGFzcz0iZm9ybS1jb250cm9sIiBvbmNoYW5nZT17e2FjdGlvbiAiaW5zdGFuY2VUeXBlU2VsZWN0ZWQiIHZhbHVlPSJ0YXJnZXQudmFsdWUifX0+CiAgICAgICAgICB7eyNlYWNoIGRldmljZVR5cGUgYXMgfHR5cGV8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3t0eXBlLnZhbHVlfX0gc2VsZWN0ZWQ9e3tlcSBjb25maWcuZGV2aWNlVHlwZSB0eXBlLnZhbHVlfX0+CiAgICAgICAgICAgIHt7dHlwZS5uYW1lfX0KICAgICAgICAgIDwvb3B0aW9uPgogICAgICAgICAge3svZWFjaH19CiAgICAgICAgPC9zZWxlY3Q+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJyb3cgbXQtMjAiPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KCiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5zaXplLmxhYmVsIn19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGNsYXNzPSJmb3JtLWNvbnRyb2wiIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgY29uZmlnLnBsYW4pIHZhbHVlPSJ0YXJnZXQudmFsdWUifX0+CiAgICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VzIGFzIHxjaG9pY2V8fX0KICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3tjaG9pY2Uuc2x1Z319IHNlbGVjdGVkPXt7ZXEgY29uZmlnLnBsYW4gY2hvaWNlLnNsdWd9fT4KICAgICAgICAgICAge3tjaG9pY2UubmFtZX19CiAgICAgICAgICAgIHt7I2lmIGNob2ljZS5wcmljaW5nLmhvdXJ9fQogICAgICAgICAgICAke3tjaG9pY2UucHJpY2luZy5ob3VyfX0gL2hyCiAgICAgICAgICAgIHt7ZWxzZX19CiAgICAgICAgICAgICR7e2Nob2ljZS5wcmljaW5nLmRheX19IC9kYXkKICAgICAgICAgICAge3svaWZ9fQogICAgICAgICAgPC9vcHRpb24+CiAgICAgICAgICB7ey9lYWNofX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJyb3cgbXQtMjAiPgogICAgICA8aDQ+e3t0ICJub2RlRHJpdmVyLnBhY2tldC5wbGFuRGV0YWlscy5sYWJlbCJ9fTwvaDQ+CiAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgIHt7dCAibm9kZURyaXZlci5wYWNrZXQucGxhbkRldGFpbHMuY3B1In19CiAgICAgICAgPC9sYWJlbD4KICAgICAgICB7eyNlYWNoIHBsYW5DaG9pY2VEZXRhaWxzLnNwZWNzLmNwdXMgYXMgfHBsYW58fX0KICAgICAgICA8ZGl2PgogICAgICAgICAge3twbGFuLmNvdW50fX0ge3twbGFuLnR5cGV9fQogICAgICAgIDwvZGl2PgogICAgICAgIHt7L2VhY2h9fQogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAge3t0ICJub2RlRHJpdmVyLnBhY2tldC5wbGFuRGV0YWlscy5tZW1vcnkifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIDxkaXY+CiAgICAgICAgICB7e3BsYW5DaG9pY2VEZXRhaWxzLnNwZWNzLm1lbW9yeS50b3RhbH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnBsYW5EZXRhaWxzLmRyaXZlcyJ9fQogICAgICAgIDwvbGFiZWw+CiAgICAgICAge3sjZWFjaCBwbGFuQ2hvaWNlRGV0YWlscy5zcGVjcy5kcml2ZXMgYXMgfHBsYW58fX0KICAgICAgICA8ZGl2PgogICAgICAgICAge3twbGFuLmNvdW50fX0ge3twbGFuLnNpemV9fSB7e3BsYW4udHlwZX19CiAgICAgICAgPC9kaXY+CiAgICAgICAge3svZWFjaH19CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIucGFja2V0LnBsYW5EZXRhaWxzLm5ldHdvcmsifX0KICAgICAgICA8L2xhYmVsPgogICAgICAgIHt7I2VhY2ggcGxhbkNob2ljZURldGFpbHMuc3BlY3MubmljcyBhcyB8cGxhbnx9fQogICAgICAgIDxkaXY+CiAgICAgICAgICB7e3BsYW4uY291bnR9fSB7e3BsYW4udHlwZX19CiAgICAgICAgPC9kaXY+CiAgICAgICAge3svZWFjaH19CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CgogIDxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgPHNwYW4+CiAgICAgIHt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fQogICAgPC9zcGFuPgogIDwvZGl2PgoKICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbgogICAgICAgIG1vZGVsPW1vZGVsCiAgICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgICAgICByb3dDbGFzcz0icm93IG1iLTEwIgogICAgICB9fQoKICB7e2Zvcm0tdXNlci1sYWJlbHMKICAgICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgICAgc2V0TGFiZWxzPShhY3Rpb24gInNldExhYmVscyIpCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIH19CgogIHt7Zm9ybS1ub2RlLXRhaW50cwogICAgICAgIG1vZGVsPW1vZGVsCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIH19CgogIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICAgIG1hY2hpbmU9bW9kZWwKICAgICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgICAgfX0KCiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQogIHt7c2F2ZS1jYW5jZWwKICAgICAgICBzYXZlPShhY3Rpb24gInNhdmUiKQogICAgICAgIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKQogICAgICAgIGVkaXRpbmc9ZWRpdGluZwogICAgICB9fQogIHt7L2lmfX0KICB7ey9hY2NvcmRpb24tbGlzdH19Cjwvc2VjdGlvbj4=";
  var OS_WHITELIST = ['centos_7', 'coreos_stable', 'ubuntu_14_04', 'ubuntu_16_04', 'ubuntu_18_04', 'rancher'];
  var PLAN_BLACKLIST = ['baremetal_2a'];
  var DEFAULTS = {
    os: 'ubuntu_16_04',
    billingCycle: 'hourly'
  };
  var defaultFacility = "ewr1";
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
        var instanceType = get(this, 'config.hwReservationId');

        if (instanceType == "") {
          set(this, 'config.deviceType', 'on-demand');
        } else {
          set(this, 'config.deviceType', 'reserved');
        }

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
          var facilityCode = get(_this, 'config.facilityCode');

          if (!facilityCode) {
            set(_this, 'config.facilityCode', defaultFacility);
          }

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
    facilityObserver: on('init', observer('config.facilityCode', function () {
      var facilities = get(this, 'facilityChoices');
      var slug = get(this, 'config.facilityCode');
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
        var currentOS = get(this, 'config.os');
        var osChoices = get(this, 'osChoices');
        var filteredByOs = this.parsePlans(osChoices.findBy('slug', currentOS), out);
        set(this, 'planChoices', filteredByOs);
        if (filteredByOs.length > 0) set(this, 'config.plan', filteredByOs[0].slug);else if (filteredByOs.length == 0) {
          set(this, 'config.plan', "");
        }

        for (var i = 0; filteredByOs.length; i++) {
          if (filteredByOs[i].slug == 'baremetal_0') {
            set(this, 'config.plan', filteredByOs[i].slug);
            break;
          }
        }
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
      this.notifyPropertyChange('config.facilityCode');
    },
    getOnDemandPlans: function getOnDemandPlans() {
      var config = get(this, 'config');
      setProperties(config, {
        deviceType: 'on-demand'
      });
      this.notifyPropertyChange('config.facilityCode');
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