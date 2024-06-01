import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {
private taskdropdown = environment.rootPath + "tasks/proctasks";
private servicedropdwn =environment.rootPath + "services/procservices";
private user_98_97 =environment.rootPath + "User_98_97/procUser_98_97";
private View_user_98_97 =environment.rootPath + "view/View_User_98_97";
private woredaLookup =environment.rootPath + "Woreda_Lookup/procWoreda_Lookup/";
private service_group =environment.rootPath + "Service_Group/procService_Group";

private DocumentArc =environment.rootPath + "Document_Archive/procDocument_Archive";

private Requirement_Documents= environment.rootpath2 + "getRequrementDocumentOfTasks";
private save_Documentoftask = environment.rootpath2 + "SaveDocumentMaster";
private Save_License_Service=environment.rootpath2+'saveLicenceServiceRecord'
private Remove_Document=environment.rootpath2 +"Remove_RequrementDocument";
private  License_Service= environment.rootpath2 +"License_Service";
private License_Service1 =
    environment.rootPath + "License_Service/procLicense_Service";
private  Tasks= environment.rootpath2 +"getTasks";
private  Document= environment.rootpath2 +"getAllDocument";
private saveFileLookUP = environment.rootpath2 + "SaveDocumentMaster"; 
private UpdateCertURL1 = environment.rootpath3 + "Document_Archive";
private UpdateCertURL=environment.rootPath +"Document_Archive/procDocument_Archive";
private GetApplicationNumberByUserURL =
    environment.rootpath2 + "GetApplicationNumberByUser";
private getRequerdURL =
environment.rootpath2 + "getRequrementDocumentOfTasks";
private All_Service = 'http://197.156.93.110/XOKA.eoffice.bpel_Land/api/' + "BPEL/Service";
private Task_Service = 'http://197.156.93.110/XOKA.eoffice.bpel_Land/api/' + "BPEL/getTasks";
private  All_Org= environment.rootpath2 +"AllOrg"
//  private  All_Org= "https://www.addisland.gov.et:444/XOKA.eoffice.bpel_land/api/BPEL/AllOrg"
private orgdropdwn=environment.rootPath +"organizations/procorganizations";
//  private orgdropdwn="https://www.addisland.gov.et:444/Xoka_land_API/api/organizations/procorganizations";
//  public Application_status = "https://www.addisland.gov.et:444/Xoka_land_API/api/view/viewStatusReport/organization/";
//  public Application_status = environment.rootPath + "view/viewStatusReport/organization/";
public customerUrl = environment.rootPath + "Customer/procCustomer";
public Username = environment.rootPath + "view/View_GetcustomerAllWithVitalId/";
public CustomerId = environment.rootPath + "view/View_GetcustomerAllWithVitalId/Customer_ID/";
public CustomerByColumn= environment.rootPath + "Customer/procCustomer/Column/"
public Application_status= environment.rootPath + "viewStatusReportS/procviewStatusReport/"
public Application_statusCheckOrg= environment.rootPath + "View_applicationorgforapi"
public Postitnote= environment.rootPath + "view/View_postit_note_user/application_number"
public QRcode= environment.rootPath + "QRCode/QRCode"
public CustomerByColumn1= environment.rootPath + "Customer/procCustomer/Column/Column/CustomerLoadByTitledeedculumn/";
private EthiopianToGregorian = environment.rootPath + "EthiopianToGregorian";
private gregorianToEthiopianDate =
environment.rootPath + "gregorianToEthiopianDate";
public DocByAppNo = environment.rootPath + "View_RecordAppNoAndDocIdByAppNo/procView_RecordAppNoAndDocIdByAppNo/";
public DeedByAPP = environment.rootPath + "view/View_DeedRegstration/Application_No/";
public DeedByCustId = environment.rootPath + "view/View_DeedRegstration12/Customer_ID";
public AppbyUserId = environment.rootPath + "ApplicationLoadByUserId/procApplicationLoadByUserId/";

private getTodandAppNoURL = environment.rootpath2 + "TodandAppNo";
private RemoveDocURL =
environment.rootpath2 + "Remove_RequrementDocument";
private License_ServiceURL = environment.rootpath3 + "License_Service";





  constructor(private http: HttpClient) { }

  getAll(AppNo) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        AppNo +
        "&searchString&pageIndex&pageSize"
    );
  }
  GetApplicationNumberByUser(username) {
    return this.http.get(
      this.GetApplicationNumberByUserURL + "?UserName=" + username
    );
  }
  RemoveDoc(DocCode) {
    return this.http.post(
      this.RemoveDocURL +
        "?currentUserId=" +
        environment.username +
        "&document_code=" +
        DocCode,
      null
    );
  }
  getEthiopianToGregorian(date) {
    if (date) {
      const dateStr = date;
      const dateParts = dateStr.split("/");
      const year = +dateParts[2]; // Convert to a number using the '+' operator
      const month = +dateParts[1];
      const day = +dateParts[0];
      console.log("datedatedate", year, month, day);
      return this.http.get<any>(
        this.EthiopianToGregorian + "/" + year + "/" + month + "/" + day
      );
    }
  }
  getOrganization(){
   return this.http.get(this.orgdropdwn)
  }
  getgregorianToEthiopianDate(date) {
    if (date) {
      let year = parseInt(date.split("-")[0]);
      let month = parseInt(date.split("-")[1]);
      let day = parseInt(date.split("-")[2].split(":")[0].split("T")[0]);

      return this.http.get<any>(
        this.gregorianToEthiopianDate + "/" + year + "/" + month + "/" + day
      );
    }
  }
 
  getPriveys(certefcatcode) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        certefcatcode +
        "&searchString&pageIndex&pageSize"
    );
  }
  getDocumentArc(){
    return this.http.get(this.DocumentArc)
  }
  getView_user_98_97(){
    return this.http.get(`http://197.156.93.110/Xoka_land_API/api/view/View_User_98_97`)
  } 
  getDocIdByAppNo(AppNo){
    return this.http.get(this.DocByAppNo+AppNo)
  }
  getworedalookUP(subcity){
    return this.http.get(this.woredaLookup+subcity)
  }

  getDeedByApp(AppNo){
    
    return this.http.get(this.DeedByAPP+'Application_No?Application_No='+AppNo)
  }
  getApplicationStatus(AppNo,orgid){
    // http://197.156.93.110/Xoka_land_API/api/view/viewStatusReport/organization/921D772-3A1C-4641-95A0-0AB320BAC3E2?Application_No=AR-2722024-638446388268111713
    return this.http.get(this.Application_status+orgid+'?ANo='+AppNo)
  }
  getApplicationStatusCheckOrg(AppNo){
   return this.http.get(this.Application_statusCheckOrg+'/'+AppNo)
  }
  getPostitnote(AppNo,username){

    return this.http.get(this.Postitnote+'?application_number='+AppNo)
  }
  getDeedByCustId(CustId){
    
    return this.http.get(this.DeedByCustId+'?Customer_ID='+CustId)
  }
  getAppbyUserid(UserId){
    
    return this.http.get(this.AppbyUserId+UserId)
  }
  getLicenceService(AppNo) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        AppNo +
        "&searchString&pageIndex&pageSize"
    );
  }
  gettask(serviceCode: string) {
    const url = `${this.Task_Service}?ServiceCode=${encodeURIComponent(serviceCode)}`;
    return this.http.get(url);
  }
  getservice(){
    return this.http.get(this.All_Service)
  }
  getservice_group(){
    return this.http.get(this.service_group)
  }
  
  getUsernme(data){
    return this.http.get(this.Username+"UserName?UserName="+data)
  }
  getByCustomerId(data){
    return this.http.get(this.CustomerId+"Customer_ID?Customer_ID="+data)
  }
  getQRcode(data){
    return this.http.get(this.QRcode+"?data="+data)
  }
  getCustomerByCols(col){
    return this.http.get(this.CustomerByColumn+col)
  }
  getTasks(data){
    return this.http.get(this.Tasks+"?ServiceCode="+data)
  }
  saveFile(
    DocData,
    FileType,
    ApplicationNo,
    RequrementID,
    TaskType,
    Requrement,
    DocID
  ) {
    // console.log('File', File);
    /*return this.http.post(this.saveFileLookUP + '?' + 'TaskType=' + TaskType + '&ApplicationNo=' + ApplicationNo + '&DocData=' + File + '&uid=00000000-0000-0000-0000-000000000000' + '&FileType=' + Type + '&RequrementID=' + ReqId + '&Requrement=' + Requrement, null);*/

    return this.http.post(this.saveFileLookUP, {
      TaskType,
      ApplicationNo,
      DocData,
      uid: environment.username,
      FileType,
      RequrementID,
      Requrement,
      DocID,
    });
  }
  // getAllDocument(data){
  //   console.log('dataaa',data[0]);
    
  //   return this.http.get(this.Document+"?ApplicationCode="+data[0]+"&DocID="+data[1])
  // }
  UpdateLicence(LicenceData) {
    return this.http.put(this.License_Service1, LicenceData);
  }
  UpdateUser_98_97(users) {
    return this.http.put(this.user_98_97, users);
  }
  CreateDocmentArcive(cerltter) {
    
    return this.http.post(this.UpdateCertURL, cerltter);
  }
  CreateUser_97_98(users) {
    
    return this.http.post(this.user_98_97, users);
  }
  DeleteUser_97_98(id) {
    
    return this.http.delete(this.user_98_97+'/'+id);
  }
  getByUidUser_97_98(id) {
 
    return this.http.get(this.user_98_97+'/'+ id);
  }
  UpdateDocmentArcive(recordDocumnet) {
    console.log('cerltterrrrrrr',recordDocumnet);
    return this.http.put(this.UpdateCertURL, recordDocumnet);
  }
  getDocmentArcive(Title_Deed_No) {
    return this.http.get(
      this.UpdateCertURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        Title_Deed_No +
        "&searchString&pageIndex&pageSize"
    );
  }
  getAllDocument(ApplicationCode, DocID) {
    console.log("ApplicationCode, DocID", ApplicationCode, DocID);

    return this.http.get<any[]>(
      this.Document +
        "?" +
        "ApplicationCode=" +
        ApplicationCode +
        "&DocID=" +
        DocID
    );
  }
  getTodandAppNo(AppNo) {
    return this.http.get<any[]>(
      this.getTodandAppNoURL + "?" + "ApplicationNo=" + AppNo
    );
  }

  getRequerdDocs(TaskID) {
    return this.http.get(this.getRequerdURL + "?TaskID=" + TaskID);
  }
  getorg(){
    return this.http.get(this.All_Org)
  }
  getreqdoc(){
    return this.http.get(this.Requirement_Documents)
  }
  postdocfortask(data){
    return this.http.post(this.save_Documentoftask, data)
  }
  savelaicneceservice(record){
    console.log('record',record);
    
    return this.http.post(this.Save_License_Service +"?ApplicationNo=" + "00000000-0000-0000-0000-000000000000" + 
    "&ServiceCode="+record.selectedService +"&applicationDate=" + record.date + 
    "&SDP=" +record.Org +"&TitleDeedNo=" + record.Deed +"&Woredaid=" + record.Woreda+"&ploteNo=" + record.FullName_AM, record )
  }

  saveRecord(data){
    console.log('logggggg1',data);
    
      return this.http.post(
        this.Save_License_Service + "?ApplicationNo=" + data.appno+"&ServiceCode="+data.selectedService+"&applicationDate="+data.date
        +"&SDP="+data.SDP+"&TitleDeedNo="+data.Deed+"&Woredaid="+data.Woreda+"&ploteNo="+data.FullName_AM,
        null
      );
    
  }
  deletedoc(){
    return this.http.delete(this.Remove_Document)
  }
  getcustomerby() {
    return this.http.get(this.customerUrl);
  }
  getUser_98_97() {
    return this.http.get(this.user_98_97);
  }
}
