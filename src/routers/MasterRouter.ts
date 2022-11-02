import { Router } from 'express';
import ProblemRouter from './ProblemRouter';
import ReductionRouter from './ReductionRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = ProblemRouter;
  private _subrouterB = ReductionRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/Problem', this._subrouterA);
    this._router.use('/Reduction', this._subrouterB);
  }
}

export = new MasterRouter().router;