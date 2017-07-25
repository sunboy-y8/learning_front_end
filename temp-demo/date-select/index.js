/**
 * Created by GanMingYing on 2017/7/25.
 */

/*开始日期与结束日期的时间控件*/
$('.dateSelectStart').datetimepicker({
    format: 'yyyy-mm-dd',
    minView:2,
    language:'zh-CN',
    autoclose:true
});

$('.dateSelectEnd').datetimepicker({
    format: 'yyyy-mm-dd',
    minView:2,
    language:'zh-CN',
    autoclose:true
});

/*查询已选择日期之间的工作日日期（包含选择的日期）*/
document.getElementsByClassName('dataSelectSearch')[0].onclick = function () {
    /*获取日期*/
    let startDate = document.getElementsByClassName('dateSelectStart')[0].value;
    let endDate = document.getElementsByClassName('dateSelectEnd')[0].value;

    /*设置为date对象*/
    let startDateObj =  getDate(startDate);
    let endDateObj =  getDate(endDate);
    if(compareDate(startDateObj,endDateObj) === 1){
      let tempDateObj = startDateObj;
        startDateObj = endDateObj;
        endDateObj = tempDateObj;
    }

    let tempDate = startDateObj; //临时日期对象
    let i=0; //循环变量
    let showDate = [];  //当前选择日期之间的所有date对象数组
    while(compareDate(tempDate,endDateObj)=== -1){
        tempDate = new Date(startDateObj.valueOf()+i*24*60*60*1000);
        showDate.push(tempDate);
        i++;
    }

    let showString = [];  //日期对应的字符串数组
    for(let i=0;i<showDate.length;i++){
        //过滤节假日
        if(holidayDate.indexOf(getString(showDate[i]))!=-1){
            continue;
        }
        showString.push(getString(showDate[i]));
    }

    document.getElementsByClassName('dataSelectShow')[0].innerHTML = showString.join();

}

var holidayDate = [];
document.getElementsByClassName('addHolidayDate')[0].onclick = function () {
    let addHoliday = getHoliday();
    let holidayYear = document.getElementsByClassName('holidayYear')[0].value;
    let holidayMonth = document.getElementsByClassName('holidayMonth')[0].value;
    let holidayDay = document.getElementsByClassName('holidayDay')[0].value;

    holidayDate =addHoliday(holidayYear,holidayMonth,holidayDay);
    console.log(holidayDate);
}


/**
 * 根据年-月-日字符串获取date对象
 * @param date
 * @returns {*}
 */
var getDate = function (date) {
    if(typeof date === 'string'){
      let dateArray = date.split('-');
        if(dateArray.length === 3 &&
            dateArray[1]%1===0 &&
            dateArray[2]%1 ===0 &&
            dateArray[1] >0 && dateArray[1] <13 &&
            dateArray[2] >0 && dateArray[2] <32
        ){
            let tempDate = new Date();
            tempDate.setFullYear(dateArray[0].trim());
            tempDate.setMonth(dateArray[1].trim()-1);
            tempDate.setDate(dateArray[2].trim());
          return tempDate;
        }
        else{
            return null;
        }
    }
}

/**
 * 获取date的年-月-日格式字符串
 * @param date
 * @returns {string}
 */
var getString = function (date) {
   return date.getFullYear()+'-'+getFullDate(date.getMonth()+1)+'-'+getFullDate(date.getDate());
}

/**
 * num 个位数时，在前添0
 * @param num
 * @returns {*}
 */
var getFullDate = function (num) {
    if(num%1===0&&num/10<1){
        return '0'+num;
    }else{
        return num;
    }
}

/**
 * date1 > date2 return 1
 * date1 = date2 return 0
 * date1 < date2 return -1
 * date1 或 date2 不是对象，则return 2
 * @param date1
 * @param date2
 * @returns {number}
 */
var compareDate = function (date1,date2) {
    if(date1==null||date2==null||date1.constructor != Date||date2.constructor != Date){
      return 2;
    }
    if(date1.getFullYear()>date2.getFullYear()){
        return 1;
    }else if(date1.getFullYear()<date2.getFullYear()){
        return -1;
    }else if(date1.getMonth()>date2.getMonth()){
        return 1;
    }else if(date1.getMonth()<date2.getMonth()){
        return -1;
    }else if(date1.getDate()>date2.getDate()){
        return 1;
    }else if(date1.getDate()<date2.getDate()){
        return -1;
    }else{
        return 0;
    }
}


/**
 * 添加节假日
 * @returns {push}
 */
var getHoliday = function () {
    let date = ['2017-01-01','2017-05-01','2017-10-01'];
    function push(year,month,day) {
        if(year%1===0&&year>0&&month%1===0&&month>0&&day%1===0&&day>0&&
                month<13&&day<32
        ){
            date.push(year+'-'+getFullDate(month)+'-'+getFullDate(day));
        }
        return date;
    }
    return push;
}