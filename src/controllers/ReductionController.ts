import ErrorHandler from "../models/ErrorHandler";

class ReductionController {
  defaultMethod() {
    throw new ErrorHandler(501, 'Not implemented method');
  }
}
  
export = new ReductionController();