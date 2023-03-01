import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/form/model/form';
import { FormService } from 'src/app/form/service/form.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss'],
})
export class ResumeListComponent implements OnInit, OnDestroy {
  @ViewChildren('htmlData') htmlData!: QueryList<ElementRef>;
  public curriculum: Form[] = [];
  public subscription: Subscription = new Subscription();

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.formService.getCurriculum.subscribe((res) => {
        this.curriculum = res;
      })
    );
  }

  removeCurriculum(cpf: string) {
    this.formService.deleteCurriculum(cpf);
  }

  emptyCurriculumList() {
    this.formService.removeAllCurriculum();
  }

  makePDF(elementIndex: number) {
    const element: any = this.htmlData.find(
      (element, index) => index === elementIndex
    );

    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(element.nativeElement, {
      callback: (pdf) => {
        pdf.save('curriculum.pdf');
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
