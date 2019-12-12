define('ui/components/machine/driver-packet/component',
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
        this.set('model.packetConfig.plan', plan);
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
        this.set('model.packetConfig.os', os);
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
          // console.log(this.get('model.packetConfig'));
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


;
define("ui/components/machine/driver-packet/template",["exports","ember","ui/mixins/driver"],function(exports,_ember,_uiMixinsDriver){

exports["default"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 39,
            "column": 12
          },
          "end": {
            "line": 41,
            "column": 12
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("              ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element2, 'value');
        morphs[1] = dom.createAttrMorph(element2, 'selected');
        morphs[2] = dom.createMorphAt(element2,0,0);
        return morphs;
      },
      statements: [
        ["attribute","value",["get","choice.value",["loc",[null,[40,30],[40,42]]],0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","packetConfig.os",["loc",[null,[40,59],[40,74]]],0,0,0,0],["get","choice.value",["loc",[null,[40,75],[40,87]]],0,0,0,0]],[],["loc",[null,[null,null],[40,89]]],0,0],0,0,0,0],
        ["content","choice.name",["loc",[null,[40,90],[40,105]]],0,0,0,0]
      ],
      locals: ["choice"],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 49,
            "column": 12
          },
          "end": {
            "line": 51,
            "column": 12
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("              ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element1, 'value');
        morphs[1] = dom.createAttrMorph(element1, 'selected');
        morphs[2] = dom.createMorphAt(element1,0,0);
        return morphs;
      },
      statements: [
        ["attribute","value",["get","choice.value",["loc",[null,[50,30],[50,42]]],0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","packetConfig.plan",["loc",[null,[50,59],[50,76]]],0,0,0,0],["get","choice.value",["loc",[null,[50,77],[50,89]]],0,0,0,0]],[],["loc",[null,[null,null],[50,91]]],0,0],0,0,0,0],
        ["content","choice.name",["loc",[null,[50,92],[50,107]]],0,0,0,0]
      ],
      locals: ["choice"],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 66,
            "column": 12
          },
          "end": {
            "line": 68,
            "column": 12
          }
        }
      },
      isEmpty: false,
      arity: 1,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("              ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("option");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'value');
        morphs[1] = dom.createAttrMorph(element0, 'selected');
        morphs[2] = dom.createMorphAt(element0,0,0);
        return morphs;
      },
      statements: [
        ["attribute","value",["get","choice.code",["loc",[null,[67,30],[67,41]]],0,0,0,0],0,0,0,0],
        ["attribute","selected",["subexpr","eq",[["get","packetConfig.facilityCode",["loc",[null,[67,58],[67,83]]],0,0,0,0],["get","choice.code",["loc",[null,[67,84],[67,95]]],0,0,0,0]],[],["loc",[null,[null,null],[67,97]]],0,0],0,0,0,0],
        ["content","choice.name",["loc",[null,[67,98],[67,113]]],0,0,0,0]
      ],
      locals: ["choice"],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.9.1",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 80,
          "column": 0
        }
      }
    },
    isEmpty: false,
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("form");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("section");
      dom.setAttribute(el2,"class","horizontal-form");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","container-fluid");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","over-hr r-mt20 r-mb20");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("*");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-10");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("*");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-10");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("p");
      dom.setAttribute(el6,"class","help-block");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","over-hr r-mt20 r-mb20");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-4");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-4");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","over-hr r-mt20 r-mb20");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","row form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-2 form-label");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("label");
      dom.setAttribute(el6,"class","form-control-static");
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","col-md-10");
      var el6 = dom.createTextNode("\n          ");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("select");
      dom.setAttribute(el6,"class","form-control");
      var el7 = dom.createTextNode("\n");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("          ");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n        ");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n    ");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element3 = dom.childAt(fragment, [0, 1]);
      var element4 = dom.childAt(element3, [1]);
      var element5 = dom.childAt(element4, [5]);
      var element6 = dom.childAt(element4, [7]);
      var element7 = dom.childAt(element6, [3]);
      var element8 = dom.childAt(element4, [11]);
      var element9 = dom.childAt(element8, [3, 1]);
      var element10 = dom.childAt(element8, [7, 1]);
      var element11 = dom.childAt(element4, [15]);
      var element12 = dom.childAt(element11, [3, 1]);
      var morphs = new Array(21);
      morphs[0] = dom.createMorphAt(element4,1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element4, [3, 1]),0,0);
      morphs[2] = dom.createMorphAt(dom.childAt(element5, [1, 1]),0,0);
      morphs[3] = dom.createMorphAt(dom.childAt(element5, [3]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(element6, [1, 1]),0,0);
      morphs[5] = dom.createMorphAt(element7,1,1);
      morphs[6] = dom.createMorphAt(dom.childAt(element7, [3]),0,0);
      morphs[7] = dom.createMorphAt(dom.childAt(element4, [9, 1]),0,0);
      morphs[8] = dom.createMorphAt(dom.childAt(element8, [1, 1]),0,0);
      morphs[9] = dom.createAttrMorph(element9, 'onchange');
      morphs[10] = dom.createMorphAt(element9,1,1);
      morphs[11] = dom.createMorphAt(dom.childAt(element8, [5, 1]),0,0);
      morphs[12] = dom.createAttrMorph(element10, 'onchange');
      morphs[13] = dom.createMorphAt(element10,1,1);
      morphs[14] = dom.createMorphAt(dom.childAt(element4, [13, 1]),0,0);
      morphs[15] = dom.createMorphAt(dom.childAt(element11, [1, 1]),0,0);
      morphs[16] = dom.createAttrMorph(element12, 'onchange');
      morphs[17] = dom.createMorphAt(element12,1,1);
      morphs[18] = dom.createMorphAt(element4,17,17);
      morphs[19] = dom.createMorphAt(element3,3,3);
      morphs[20] = dom.createMorphAt(element3,5,5);
      return morphs;
    },
    statements: [
      ["inline","partial",["host/add-common"],[],["loc",[null,[4,6],[4,35]]],0,0],
      ["inline","t",["machine.driverPacket.accountSection"],[],["loc",[null,[7,14],[7,57]]],0,0],
      ["inline","t",["machine.driverPacket.projectId.label"],[],["loc",[null,[12,45],[12,89]]],0,0],
      ["inline","input",[],["type","text","name","username","value",["subexpr","@mut",[["get","packetConfig.projectId",["loc",[null,[15,52],[15,74]]],0,0,0,0]],[],[],0,0],"classNames","form-control","placeholder",["subexpr","t",["machine.driverPacket.projectId.placeholder"],[],["loc",[null,[15,113],[15,161]]],0,0]],["loc",[null,[15,10],[15,163]]],0,0],
      ["inline","t",["machine.driverPacket.apiKey.label"],[],["loc",[null,[21,45],[21,86]]],0,0],
      ["inline","input",[],["type","password","name","password","value",["subexpr","@mut",[["get","packetConfig.apiKey",["loc",[null,[24,56],[24,75]]],0,0,0,0]],[],[],0,0],"classNames","form-control","placeholder",["subexpr","t",["machine.driverPacket.apiKey.placeholder"],[],["loc",[null,[24,114],[24,159]]],0,0]],["loc",[null,[24,10],[24,161]]],0,0],
      ["inline","format-html-message",["machine.driverPacket.apiKeyHelp"],[],["loc",[null,[25,32],[25,89]]],0,0],
      ["inline","t",["machine.driverPacket.instanceSection"],[],["loc",[null,[30,14],[30,58]]],0,0],
      ["inline","t",["machine.driverPacket.image.label"],[],["loc",[null,[35,45],[35,85]]],0,0],
      ["attribute","onchange",["subexpr","action",["selectOS"],["value","target.value"],["loc",[null,[null,null],[38,90]]],0,0],0,0,0,0],
      ["block","each",[["get","osChoices",["loc",[null,[39,20],[39,29]]],0,0,0,0]],[],0,null,["loc",[null,[39,12],[41,21]]]],
      ["inline","t",["machine.driverPacket.size.label"],[],["loc",[null,[45,45],[45,84]]],0,0],
      ["attribute","onchange",["subexpr","action",["selectPlan"],["value","target.value"],["loc",[null,[null,null],[48,92]]],0,0],0,0,0,0],
      ["block","each",[["get","planChoices",["loc",[null,[49,20],[49,31]]],0,0,0,0]],[],1,null,["loc",[null,[49,12],[51,21]]]],
      ["inline","t",["machine.driverPacket.regionSection"],[],["loc",[null,[57,14],[57,56]]],0,0],
      ["inline","t",["machine.driverPacket.region.label"],[],["loc",[null,[62,45],[62,86]]],0,0],
      ["attribute","onchange",["subexpr","action",[["subexpr","mut",[["get","packetConfig.facilityCode",["loc",[null,[65,62],[65,87]]],0,0,0,0]],[],["loc",[null,[65,57],[65,88]]],0,0]],["value","target.value"],["loc",[null,[null,null],[65,111]]],0,0],0,0,0,0],
      ["block","each",[["get","facilityChoices",["loc",[null,[66,20],[66,35]]],0,0,0,0]],[],2,null,["loc",[null,[66,12],[68,21]]]],
      ["inline","partial",["host/add-options"],[],["loc",[null,[73,6],[73,36]]],0,0],
      ["inline","top-errors",[],["errors",["subexpr","@mut",[["get","errors",["loc",[null,[76,24],[76,30]]],0,0,0,0]],[],[],0,0]],["loc",[null,[76,4],[76,32]]],0,0],
      ["inline","save-cancel",[],["save","save","cancel","cancel"],["loc",[null,[77,4],[77,47]]],0,0]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));;

});
