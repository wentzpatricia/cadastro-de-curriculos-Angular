import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Form } from '../model/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public curriculumData = new BehaviorSubject<Form[]>([]);
  public curriculumList: Form[] = [];

  get getCurriculum() {
    return this.curriculumData.asObservable();
  }

  addCurriculum(curriculum: Form) {
    const isCpfExists: boolean = this.curriculumData.value.some(
      (item) => item.cpf === curriculum.cpf
    );

    if (isCpfExists) {
      return;
    }

    this.curriculumData.next([
      ...this.curriculumData.value,
      {
        ...curriculum,
      },
    ]);
  }

  deleteCurriculum(curriculumCPF: string) {
    const removeCurriculum = this.curriculumData.value.filter(
      (item) => item.cpf !== curriculumCPF
    );
    this.curriculumData.next(removeCurriculum);
  }

  removeAllCurriculum() {
    this.curriculumList = [];
    this.curriculumData.next(this.curriculumList);
  }
}
