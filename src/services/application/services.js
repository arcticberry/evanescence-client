import { schema } from "normalizr";

const vendor = new schema.Entity("vendors");

const service = new schema.Entity("services", {
  vendors: [vendor],
});

export default [service];
