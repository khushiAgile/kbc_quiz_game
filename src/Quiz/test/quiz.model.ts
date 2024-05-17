import { Quiz } from '../../Common/entity/quiz.entity';
import { MockModel } from '../../Provider/Database/meck.model';

export class QuizModel extends MockModel<Quiz> {
  protected entityStub = new Quiz();
}
