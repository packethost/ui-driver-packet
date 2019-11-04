define('ui/components/machine/driver-%%DRIVERNAME%%/component',
  [
    'exports',
    'ember',
    'ui/mixins/driver',
  ],
  function (exports, _ember, _uiMixinsDriver) {
    const osChoices = [
      {
        value: 'centos_7',
        name: 'CentOS 7',
        provisionable_on: [
          "c1.bloomberg.x86",
          "c1.large.arm",
          "baremetal_2a",
          "c1.small.x86",
          "c1.small.x86",
          "baremetal_1",
          "c1.xlarge.x86",
          "c1.xlarge.x86",
          "baremetal_3",
          "c2.large.anbox",
          "c2.large.arm",
          "c2.medium.x86",
          "c2.medium.x86",
          "c2.small.x86",
          "c3.medium.x86",
          "c3.medium.x86",
          "cpe1.g1.4028gr",
          "cpe1.m2.r640",
          "cpe1.m2.r640",
          "cpe1.s1.r730",
          "cpe1.s1.r730",
          "d1f.optane.x86",
          "d1p.optane.x86",
          "g2.large.x86",
          "g2.large.x86",
          "m1.xlarge.x86",
          "baremetal_2",
          "m1.xlarge.x86",
          "m2.xlarge.x86",
          "m2.xlarge.x86",
          "n2.xlarge.x86",
          "s1.large.x86",
          "baremetal_s",
          "s1.large.x86",
          "t1.small.x86",
          "t1.small.x86",
          "baremetal_0",
          "x1.small.x86",
          "baremetal_1e",
          "x1.small.x86",
          "x2.xlarge.x86",
          "x2.xlarge.x86"
        ],
      },
      {
        value: 'coreos_stable',
        name: 'Container Linux - Stable',
        provisionable_on: [
          "c1.small.x86",
          "baremetal_1",
          "c1.xlarge.x86",
          "baremetal_3",
          "c2.medium.x86",
          "m1.xlarge.x86",
          "baremetal_2",
          "m2.xlarge.x86",
          "s1.large.x86",
          "baremetal_s",
          "t1.small.x86",
          "baremetal_0"
        ],
      },
      {
        value: 'ubuntu_16_04',
        name: 'Ubuntu 16.04 LTS',
        provisionable_on: [
          "baremetal_2a4",
          "baremetal_2a5",
          "baremetal_5",
          "baremetal_hua",
          "c1.bloomberg.x86",
          "c1.large.arm",
          "baremetal_2a",
          "c1.large.arm.xda",
          "baremetal_2a2",
          "c1.small.x86",
          "c1.small.x86",
          "baremetal_1",
          "c1.xlarge.x86",
          "baremetal_3",
          "c1.xlarge.x86",
          "c2.large.anbox",
          "c2.large.arm",
          "c2.medium.x86",
          "c2.small.x86",
          "c2.small.x86",
          "c3.medium.x86",
          "c3.medium.x86",
          "cpe1.c1.r720xd",
          "cpe1.c1.r720xd",
          "cpe1.g1.4028gr",
          "cpe1.g1.4028gr",
          "cpe1.m2.r640",
          "cpe1.m2.r640",
          "cpe1.s1.r730",
          "cpe1.s1.r730",
          "cpe1.x1.supermicro",
          "cpe1.x1.supermicro",
          "d1f.optane.x86",
          "d1p.optane.x86",
          "g2.large.x86",
          "m1.xlarge.x86",
          "baremetal_2",
          "m2.xlarge.x86",
          "n2.xlarge.x86",
          "s1.large.x86",
          "baremetal_s",
          "t1.small.x86",
          "baremetal_0",
          "x1.small.x86",
          "baremetal_1e",
          "x2.xlarge.x86"
        ],
      },
      {
        value: 'rancher',
        name: 'RancherOS',
        provisionable_on: [
          "c1.small.x86",
          "baremetal_1",
          "c1.xlarge.x86",
          "baremetal_3",
          "m1.xlarge.x86",
          "baremetal_2",
          "m2.xlarge.x86",
          "s1.large.x86",
          "baremetal_s",
          "t1.small.x86",
          "baremetal_0"
        ],
      },
    ];
    const planChoices = [
      {
        value: 'c1.small.x86',
        name: 'baremetal_1',
        available_in: ["ams1", "sjc1", "nrt1", "ewr1"]
      },
      {
        value: 'c1.xlarge.x86',
        name: 'baremetal_3',
        available_in: ["ams1", "sjc1", "ewr1"],
      },
      {
        value: 'c2.medium.x86',
        name: 'c2.medium.x86',
        available_in: ["atl2", "sin3", "iad2", "phx1", "ams1", "dfw2", "ord4", "sjc1", "bos2", "lax2", "ord3", "nrt1", "ewr1", "ord2"
        ],
      },
      {
        value: 'm1.xlarge.x86',
        name: 'baremetal_2',
        available_in: ["ams1", "sjc1", "nrt1", "ewr1"],
      },
      {
        value: 'm2.xlarge.x86',
        name: 'm2.xlarge.x86',
        available_in: ["ams1", "dfw2", "sjc1", "nrt1", "ewr1"],
      },
      {
        value: 'n2.xlarge.x86',
        name: 'n2.xlarge.x86',
        available_in: ["atl2", "sea2", "phx1", "pit1", "dfw2", "sjc1", "ord3", "ewr1", "ord2"],
      },
      {
        value: 's1.large.x86',
        name: 'baremetal_s',
        available_in: ["ams1", "sjc1", "nrt1", "ewr1"],
      },
      {
        value: 't1.small.x86',
        name: 'baremetal_0',
        available_in: ["ams1", "sjc1", "nrt1", "ewr1"],
      },
      {
        value: 'x1.small.x86',
        name: 'baremetal_1e',
        available_in: ["yyz1", "mrs1", "dfw2", "sjc1", "ewr1", "fra2"],
      }
    ];
    const packetFacilities = [
      {
        name: "Toronto, ON, CA",
        code: "yyz1",
      },
      {
        name: "Singapore",
        code: "sin3",
      },
      {
        name: "Ashburn, VA",
        code: "iad2",
      },
      {
        name: "Marseille, France",
        code: "mrs1",
      },
      {
        name: "Dallas, TX",
        code: "dfw1",
      },
      {
        name: "Hong Kong 1, HK",
        code: "hkg1",
      },
      {
        name: "Amsterdam, NL",
        code: "ams1",
      },
      {
        name: "Dallas, TX",
        code: "dfw2",
      },
      {
        name: "Seattle, WA",
        code: "sea1",
      },
      {
        name: "Sunnyvale, CA",
        code: "sjc1",
      },
      {
        name: "Tokyo, JP",
        code: "nrt1",
      },
      {
        name: "Parsippany, NJ",
        code: "ewr1",
      },
      {
        name: "Atlanta, GA",
        code: "atl1",
      },
      {
        name: "Los Angeles, CA",
        code: "lax1",
      },
      {
        name: "Sydney, Australia",
        code: "syd2",
      },
      {
        name: "Singapore",
        code: "sin1",
      },
      {
        name: "Chicago, IL",
        code: "ord1",
      },
      {
        name: "Ashburn, VA",
        code: "iad1",
      },
      {
        name: "Frankfurt 2, DE",
        code: "fra2",
      }
    ];
    let filterdFacilities = packetFacilities;
    let filterdPlan = planChoices;

    exports['default'] = _ember['default'].Component.extend(_uiMixinsDriver['default'], {
      driverName: 'packet',
      packetConfig: Ember.computed.alias('model.packetConfig'),

      facilityChoices: filterdFacilities,
      planChoices: planChoices,
      osChoices: osChoices,

      bootstrap: function () {
        let store = this.get('store');
        let config = store.createRecord({
          type: 'packetConfig',
          apiKey: '',
          projectId: '',
          os: 'ubuntu_16_04',
          facilityCode: 'ewr1',
          plan: 'c1.small.x86',
          billingCycle: 'hourly',
        });

        this.set('model', store.createRecord({
          type: 'host',
          packetConfig: config,
        }));
        this.selectPlanFn('c1.small.x86');
        this.selectOSFn('ubuntu_16_04');
      },

      selectPlanFn: function (plan) {
        this.set('model.%%DRIVERNAME%%Config.plan', plan);
        let selectedPlan = planChoices.filter(pp => pp.value === plan);
        if (selectedPlan) {
          selectedPlan = selectedPlan[0];
          filterdFacilities = packetFacilities.filter(function (pf) {
            return selectedPlan.available_in.includes(pf.code);
          });
          this.setProperties({
            facilityChoices: filterdFacilities,
          });
        }
      },
      selectOSFn: function (os) {
        this.set('model.%%DRIVERNAME%%Config.os', os);
        let selectedOS = osChoices.filter(sos => sos.value === os);
        if (selectedOS) {
          selectedOS = selectedOS[0];
          filterdPlan = planChoices.filter(function (pf) {
            return selectedOS.provisionable_on.includes(pf.value);
          });
          this.setProperties({
            planChoices: filterdPlan,
          });
        }
        this.selectPlanFn(filterdPlan[0].value);
      },

      actions: {
        selectPlan(plan) {
          this.selectPlanFn(plan);
          this.setProperties({});
        },
        selectOS(os) {
          this.selectOSFn(os);
          this.setProperties({});
        },
        create() {
          // console.log(this.get('model.%%DRIVERNAME%%Config'));
        },
        cancel() {
          // console.log('actions:cancel');
        }
      },

      validate: function () {
        this._super();
        let errors = this.get('errors') || [];

        if (!this.get('packetConfig.projectId')) {
          errors.push('Project ID is required');
        }

        if (!this.get('packetConfig.apiKey')) {
          errors.push('API Key is requried');
        }

        if (errors.length) {
          this.set('errors', errors.uniq());
          return false;
        }

        return true;
      },
    });
  });


