import { Lifeline } from '../../Common/entity/lifeline.entity';
import { MockModel } from '../../Provider/Database/meck.model';

export class LifelineModel extends MockModel<Lifeline> {
  protected entityStub = new Lifeline();
}
