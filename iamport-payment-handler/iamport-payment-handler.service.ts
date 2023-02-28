import { Injectable } from "@angular/core";
import { HistoryService } from "@vendure/core";
// import { getServerLocation } from '@vendure/admin-ui/core';
import axios from 'axios';

let serverPath;
@Injectable()
export class IamportService{
    constructor(
        public historyService: HistoryService
    ){}
}