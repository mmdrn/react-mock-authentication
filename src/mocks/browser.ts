import { setupWorker } from "msw/browser";
import { handlers as productsHandlers } from "./product";
import { handlers as authHandlers } from "./auth";

const worker = setupWorker(...[...productsHandlers], ...authHandlers);

export { worker };
