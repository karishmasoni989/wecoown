import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import * as $ from 'jquery';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-managing-cashflows-pbms-group-property',
  templateUrl: './managing-cashflows-pbms-group-property.component.html',
  styleUrls: ['./managing-cashflows-pbms-group-property.component.css']
})
export class ManagingCashflowsPbmsGroupPropertyComponent implements OnInit {
  getMemberData: any;
  createManagingCashflows: FormGroup;
  loading = false;
  public invoiceForm: FormGroup;
  getMemberPercent: any;
  createNewArrayForMembers: any[];
  AllUserNameShowArray: String[] = [];
  showCreateForm: boolean;
  getPreviousDataOfCashflow: any;
  distribution_frequency: any;
  getPreviousCashFlowId: any;
  constructor(private UserService: UserService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  // createManagingCashflowsPbmsPropertyById
  // memberPercentAmount = this.getMemberPercent.get('skills') as FormArray;
  ionViewWillEnter() {
    let getPbmsData = localStorage.getItem("SetBookData");
    let getParsePbmsData = JSON.parse(getPbmsData);
    this.getManagingCashflowData(getParsePbmsData['id']);
  }
  ngOnInit() {
    // this.invoiceForm = this.FormBuilder.group({
    // });
    let getPbmsData = localStorage.getItem("SetBookData");
    let getParsePbmsData = JSON.parse(getPbmsData);
    this.getManagingCashflowData(getParsePbmsData['id']);
  }
  getManagingCashflowData(id: any) {
    let dataForm = {
      pbms_group_id: id
    }
    if (id != null) {
      this.loading = true;
      this.UserService.getOneManagingCashflowsByPbmsPropertyId(dataForm).subscribe(result => {
        this.loading = false;
        //console.log("result of create getOneManagingCashflowsByPbmsPropertyId group: ", result);
        if (result['success'] == true) {
          this.getPreviousDataOfCashflow = result['getData'];
          if (this.getPreviousDataOfCashflow.length != 0) {
            this.distribution_frequency = this.getPreviousDataOfCashflow[0].distribution_frequency;
            let previousMemberData = this.getPreviousDataOfCashflow[0].memberData;
            this.getPreviousCashFlowId = this.getPreviousDataOfCashflow[0]._id;
            // show selected distibution type
            if (this.getPreviousDataOfCashflow[0].distribution_type == "Amount") {
              $('.spanPercent').html('$');
            }
            // compare previous member data and new memberdata
            let finalMemberData = [];
            let getPbmsData = localStorage.getItem("SetBookData");
            let getParsePbmsData = JSON.parse(getPbmsData);
            let getNewMemberData = getParsePbmsData['MemberData'];
            let getNewadminData = getParsePbmsData['admindata'];
            // first check the champion admin data
            previousMemberData.forEach(element => {
              if (getNewadminData._id === element.user_id) {
                finalMemberData.push({
                  user_id: element.user_id,
                  userFirstLastName: element.userFirstLastName,
                  isAdmin: element.isAdmin,
                  distribution_amount_or_percent: element.distribution_amount_or_percent,
                  distribution_method: element.distribution_method,
                  distribution_method_text: element.distribution_method_text
                })
              }
            });
            // then compare members of pbms group new to previous members
            if (getNewMemberData.length != 0) {
              for (let newMem = 0; newMem < getNewMemberData.length; newMem++) {
                if (getNewMemberData[newMem].status == 'Accept') {
                  for (let preMem = 0; preMem < previousMemberData.length; preMem++) {
                    if (getNewMemberData[newMem].user_id._id === previousMemberData[preMem].user_id) {
                      finalMemberData.push({
                        user_id: previousMemberData[preMem].user_id,
                        userFirstLastName: previousMemberData[preMem].userFirstLastName,
                        isAdmin: previousMemberData[preMem].isAdmin,
                        distribution_amount_or_percent: previousMemberData[preMem].distribution_amount_or_percent,
                        distribution_method: previousMemberData[preMem].distribution_method,
                        distribution_method_text: previousMemberData[preMem].distribution_method_text
                      })
                    }
                    else {
                      let user_full_name = getNewMemberData[newMem].user_id.firstname + ' ' + getNewMemberData[newMem].user_id.lastname;
                      if (getNewMemberData[newMem].is_admin == true) {
                        finalMemberData.push({
                          user_id: getNewMemberData[newMem].user_id._id,
                          userFirstLastName: user_full_name,
                          isAdmin: true,
                          distribution_amount_or_percent: '',
                          distribution_method: '',
                          distribution_method_text: ''
                        })
                      } else {
                        finalMemberData.push({
                          user_id: getNewMemberData[newMem].user_id._id,
                          userFirstLastName: user_full_name,
                          isAdmin: false,
                          distribution_amount_or_percent: '',
                          distribution_method: '',
                          distribution_method_text: ''
                        })
                      }
                    }
                  }
                }
              }
              // remove duplkicates from final array            
              let result = finalMemberData.reduce((unique, o) => {
                if (!unique.some(obj => obj.user_id === o.user_id)) {
                  //console.log("obj : ", o);
                  unique.push(o);
                } else {
                  if (o.distribution_method != "") {
                    const index = unique.indexOf({
                      user_id: o.user_id,
                    })
                    unique.splice(index, 1);
                    unique.push(o);
                  }
                }
                return unique;
              }, []);
              finalMemberData = result;
            }
            // push admin data in all memberdata
            // for create form
            this.AllUserNameShowArray = finalMemberData.map(e => {
              return e.userFirstLastName
            })
            this.createManagingCashflows = new FormGroup({
              pbms_group_id: new FormControl(''),
              reference_user_id: new FormControl(''),
              distribution_type: new FormControl(''),
              distribution_frequency: new FormControl(''),
              memberData: this.FormBuilder.array([this.initMemberDataRows(finalMemberData[0].user_id, finalMemberData[0].userFirstLastName, finalMemberData[0].isAdmin, finalMemberData[0].distribution_amount_or_percent, finalMemberData[0].distribution_method, finalMemberData[0].distribution_method_text)])
            });
            for (let index = 0; index < finalMemberData.length; index++) {
              if (index > 0) {
                this.formArr.push(this.initMemberDataRows(finalMemberData[index].user_id, finalMemberData[index].userFirstLastName, finalMemberData[index].isAdmin, finalMemberData[index].distribution_amount_or_percent, finalMemberData[index].distribution_method, finalMemberData[index].distribution_method_text));
              }
            }
            this.showCreateForm = false;
          } else {
            this.showCreateFormMethod();
          }
        }
        else if (result['success'] == false) {
          this.showCreateFormMethod();
        }
      });
    }
  }
  showCreateFormMethod() {
    // for create form
    let getPbmsData = localStorage.getItem("SetBookData");
    let getParsePbmsData = JSON.parse(getPbmsData);
    this.getMemberData = getParsePbmsData['MemberData'];
    let adminData = getParsePbmsData['admindata'];
    // push admin data in all memberdata
    let full_admin_name = adminData.firstname + ' ' + adminData.lastname;
    this.AllUserNameShowArray.push(full_admin_name);
    this.createManagingCashflows = new FormGroup({
      pbms_group_id: new FormControl(''),
      reference_user_id: new FormControl(''),
      distribution_type: new FormControl(''),
      distribution_frequency: new FormControl(''),
      memberData: this.FormBuilder.array([this.initMemberDataRows(adminData._id, full_admin_name, true, '', '', '')])
    });
    if (this.getMemberData.length != 0) {
      this.getMemberData.forEach(element => {
        if (element.status == 'Accept') {
          let user_full_name = element.user_id.firstname + ' ' + element.user_id.lastname;
          this.AllUserNameShowArray.push(user_full_name);
          if (element.is_admin == true) {
            this.formArr.push(this.initMemberDataRows(element.user_id._id, user_full_name, true, '', '', ''));
          } else {
            this.formArr.push(this.initMemberDataRows(element.user_id._id, user_full_name, false, '', '', ''));
          }
        }
      });
    }
    this.showCreateForm = true;
  }
  get formArr() {
    return this.createManagingCashflows.get('memberData') as FormArray;
  }
  initMemberDataRows(user_id, user_full_name, is_admin, distribution_amount_or_percent, distribution_method, distribution_method_text) {
    return this.FormBuilder.group({
      user_id: user_id,
      userFirstLastName: user_full_name,
      isAdmin: is_admin,
      distribution_amount_or_percent: distribution_amount_or_percent,
      distribution_method: distribution_method,
      distribution_method_text: distribution_method_text
    });
  }
  // addNewRow() {
  //   this.formArr.push(this.initMemberDataRows());
  // }
  getValue(item) {
    //console.log("form : ", item);
  }
  checkCashflows(item) {
    $('.ModalCloseClick').find('input:text').val('');
    $('.ModalCloseClick').find('select').val('');
    $('.distrinutionAnotherTextClass').hide();
    if (item == 2) {
      $('.spanPercent').html('$');
    } else {
      $('.spanPercent').html('%');
    }
  }
  submitManagingCashflows(action) {
    let finalString = "";
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // get distributionn type
    let getAmountIsChecked, getPercentIsChecked;
    if (action == 'add') {
      getAmountIsChecked = document.getElementById("checkbox-cashflow-in-amount")['checked'];
      getPercentIsChecked = document.getElementById("checkbox-cashflow-in-percent")['checked'];
    } else {
      getAmountIsChecked = document.getElementById("update-checkbox-cashflow-in-amount")['checked'];
      getPercentIsChecked = document.getElementById("update-checkbox-cashflow-in-percent")['checked'];
    }
    if (getAmountIsChecked == true) {
      this.createManagingCashflows.value.distribution_type = "Amount";
    } else if (getPercentIsChecked == true) {
      this.createManagingCashflows.value.distribution_type = "Percent";
    }
    if (this.createManagingCashflows.value.distribution_frequency == undefined || this.createManagingCashflows.value.distribution_frequency == "") {
      finalString += "Please enter distribution frequency.<br>";
    }
    this.createManagingCashflows.value.memberData.forEach(element => {
      if (element.distribution_amount_or_percent == '') {
        if (this.createManagingCashflows.value.distribution_type === "Percent") {
          finalString += "Please enter percent for " + element.userFirstLastName.toLowerCase() + ".<br>";
        } else {
          finalString += "Please enter amount for " + element.userFirstLastName.toLowerCase() + ".<br>";
        }
      }
      if (element.distribution_method == '') {
        finalString += "Please select distribution method for " + element.userFirstLastName.toLowerCase() + ".<br>";
      } else {
        if (element.distribution_method_text == '') {
          finalString += "Please enter " + element.distribution_method.toLowerCase() + " text for " + element.userFirstLastName.toLowerCase() + ".<br>";
        } else if (element.distribution_method === 'PayPal Email Address') {
          let emailValOfPaypal = element.distribution_method_text;
          if (!regex.test(emailValOfPaypal)) {
            finalString += "Please enter valid " + element.distribution_method.toLowerCase() + " text for " + element.userFirstLastName.toLowerCase() + ".<br>";
          }
        }
      }
    });
    if (this.createManagingCashflows.value.distribution_type === "Percent") {
      let sumOfAllPercent = this.createManagingCashflows.value.memberData.map(o => o.distribution_amount_or_percent).reduce((a, c) => { return Number(a) + Number(c) });
      if (sumOfAllPercent != 100) {
        finalString += "Please enter valid percent for members.<br>";
      }
    }
    // this.createManagingCashflows.value.memberData.forEach(element => {
    //     let getSumOfPercentOfAllMembers = 
    // });
    $(".bookdanger").html(finalString);
    $('.bookdanger').show();
    $('.property_head').focus();
    if (finalString === "") {
      $('.bookdanger').hide();
      this.loading = true;
      // get values of pbms group id and user id
      let getGroupIdParse = localStorage.getItem("SetBookData");
      let getGroupId = JSON.parse(getGroupIdParse);
      this.createManagingCashflows.value.pbms_group_id = getGroupId['id'];
      let userLocalId = localStorage.getItem('userInfo');
      let parseData = JSON.parse(userLocalId);
      this.createManagingCashflows.value.reference_user_id = parseData['id'];
      if (userLocalId != null) {
        if (action == 'add') {
          this.UserService.createManagingCashflowsPbmsProperty(this.createManagingCashflows.value).subscribe(result => {
            this.loading = false;
            //console.log("result of create book pbms group: ", result);
            if (result['success'] == true) {
              $(".booksuccess").html(result['message']);
              $('.booksuccess').show();
              $('.bookdanger').hide();
              setTimeout(() => {
                this.router.navigate(['/pbms-actions']);
              }, 1000)
            }
            else if (result['success'] == false) {
              $(".bookdanger").html(result['message']);
              $('.bookdanger').show();
              $('.booksuccess').hide();
            }
          });
        } else if (action == 'update') {
          this.UserService.updateMnanagingCashflowPbmsPropertyById(this.getPreviousCashFlowId, this.createManagingCashflows.value).subscribe(result => {
            this.loading = false;
            //console.log("result of create book pbms group: ", result);
            if (result['success'] == true) {
              $(".booksuccess").html(result['message']);
              $('.booksuccess').show();
              $('.bookdanger').hide();
              setTimeout(() => {
                this.router.navigate(['/pbms-actions']);
              }, 1000)
            }
            else if (result['success'] == false) {
              $(".bookdanger").html(result['message']);
              $('.bookdanger').show();
              $('.booksuccess').hide();
            }
          });
        }
      }
    }
  }
  getSelectedDistributeMethod(selectedValue, itemId) {
    // alert(itemId + 'kkk'+selectedValue)
    if (selectedValue != "") {
      $('#' + itemId + ' input').attr("placeholder", selectedValue);
      $('#' + itemId).show();
    } else {
      // $('#'+itemId+' input').val("");
      $('#' + itemId).hide();
    }
  }
  confirmCancelBooking() { }
}
