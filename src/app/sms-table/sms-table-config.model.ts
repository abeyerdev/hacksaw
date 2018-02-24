export default class CustomTableConfig {
    public sortBy: string = '';
    public sortDirection: string = 'desc';
    public pageSize:number = 100;
    public pageNumber: number = 1;
    public totalCount: number = 0;
    public totalPages: number = 0;
    public maxSize: number = 10;
    public showSelectCheckbox: boolean = true;
    public showSelectAll: boolean = true;
    public showSort: boolean = true;
    public clientSort: boolean = false;
    public clientPaging: boolean = false;
    public stickyHeader: boolean = true;
    public stickyHeaderOffset: number = 0;
    public stickyContainer: string = '';
  }