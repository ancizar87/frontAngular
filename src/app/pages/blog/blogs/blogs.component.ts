import { environment } from './../../../authService/environment.prod';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BlogService } from 'src/app/services/blog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  public expand = true;
  public hideExp: boolean = true;
  allblogs = []
  urlPublic = environment.apiUrl
  categories = [];

  constructor(public breakpointObserver: BreakpointObserver, public blog: BlogService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getAllBlog()
    this.breakpointObserver
      .observe(['(max-width: 1279px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.expand = false;
          this.hideExp = false;
        } else {
          this.hideExp = true;
          this.expand = true;
        }
      });

    this.getAllCategories();
  }

  getAllBlog(){
    this.blog.getblog().subscribe(itemblog => {
      this.allblogs.push(itemblog);
      this.allblogs = this.allblogs[0]
    })
  }

  getAllCategories() {
    this.blog.getCategorys().subscribe(category => {
      this.categories.push(category);
      this.categories = this.categories[0];
    });
  }

  filterCategories(name) {
    this.blog.filterBlogByCat(name).subscribe(blog => {
      if (blog[0] !== undefined) {
        this.allblogs = [];
        this.allblogs.push(blog);
        this.allblogs = this.allblogs[0];
      } else {
        this.snackbar.open('No existen entradas para esta categoría', 'ok', {
          duration: 3000
        })
      }
    }, err => {
      this.snackbar.open('No existen entradas para esta categoría', 'ok', {
        duration: 3000
      })
    })
  }

  scroll(elem: HTMLElement) {
    elem.scrollIntoView({behavior:'smooth'});
  }

}
