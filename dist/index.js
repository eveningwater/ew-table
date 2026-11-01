import { defineComponent as g, createVNode as c, Fragment as h, resolveComponent as f, mergeProps as y } from "vue";
const p = {
  data: {
    type: Array,
    default: () => []
  },
  align: {
    type: String,
    default: "center"
  },
  column: {
    type: Array,
    default: () => []
  }
}, S = {
  column: p.column,
  align: p.align
}, w = /* @__PURE__ */ g({
  props: {
    ...S
  },
  setup(t, {
    slots: e
  }) {
    const a = (n, b) => {
      const {
        render: s,
        slotName: u,
        headerSlot: d,
        children: m,
        ...i
      } = n, o = {};
      if (typeof s == "function" && (o.default = (l) => {
        const r = i.prop ? l.row[i.prop] : void 0;
        return s(r, l);
      }), u && typeof e[u] == "function") {
        const l = e[u];
        o.default = (r) => l(r);
      }
      if (d && e[d]) {
        const l = e[d];
        o.header = (r) => l(r);
      }
      return m != null && m.length && (o.default = () => m.map(a)), c(f("el-table-column"), y({
        key: b,
        align: t == null ? void 0 : t.align
      }, i), o);
    };
    return () => {
      var n;
      return c(h, null, [(n = t.column) == null ? void 0 : n.map(a)]);
    };
  }
}), C = /* @__PURE__ */ g({
  name: "EwTable",
  props: {
    ...p
  },
  components: {
    TableColumn: w
  },
  mounted() {
    this.injectTablePrimaryMethods();
  },
  methods: {
    injectTablePrimaryMethods() {
      const t = this, e = t.$refs.elTableRef, a = ["clearSelection", "toggleRowSelection", "toggleAllSelection", "toggleRowExpansion", "setCurrentRow", "clearSort", "clearFilter", "doLayout", "sort"];
      for (const n of a)
        t[n] || (t[n] = e == null ? void 0 : e[n]);
    }
  },
  setup(t, {
    slots: e,
    attrs: a
  }) {
    return () => c("div", {
      class: "element-table"
    }, [c(f("el-table"), y({
      data: t.data,
      ref: "elTableRef"
    }, a), {
      default: () => [c(f("table-column"), {
        column: t.column,
        align: t.align
      }, e)],
      append: () => e.append && e.append(),
      empty: () => e.empty && e.empty()
    })]);
  }
});
export {
  C as EwTable,
  C as default
};
