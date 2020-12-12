import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { environment } from '../../authService/environment.prod';
import { BlogDetail } from '../../models/blog';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  url = environment.apiUrl;
  parameter = [];
  dataDetail: BlogDetail;
  contentDetail: any;
  constructor(public route: ActivatedRoute, public blog: BlogService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.route.params.subscribe(routeParams => {
        this.parameter = [];
        let paramGet = '';
        paramGet = (routeParams.detail).split('-').join(' ');
        this.invoqueProduct(paramGet);
      });
    });
  }

  invoqueProduct(param) {
    this.blog.getDetailblog(param).subscribe((detail:BlogDetail) => {
      this.dataDetail = detail[0];
      let contenido = this.dataDetail.content;

      this.contentDetail  = contenido;
    })
  }

}
