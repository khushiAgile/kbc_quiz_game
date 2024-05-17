import { User } from '../../Common/entity/user.entity';
import { MockModel } from '../../Provider/Database/meck.model';

export class LeaderBoardModel extends MockModel<User> {
  protected entityStub = new User();
}
