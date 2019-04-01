import { JNERestService } from "./jne-rest.service";
import { JNTRestService } from "./jnt-rest.service";
import { POSRestService } from "./pos-rest.service";
import { SicepatRestService } from "./sicepat-rest.service";
import { TikiRestService } from "./tiki-rest.service";

export const jneRestService = new JNERestService;
export const jntRestService = new JNTRestService;
export const posRestService = new POSRestService;
export const sicepatRestService = new SicepatRestService;
export const tikiRestService = new TikiRestService;