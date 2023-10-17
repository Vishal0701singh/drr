const addNew = document.querySelector(".add_btn");
const tableBody = document.querySelector(".tableBody");


let newId = 1;



addNew.addEventListener('click', function (e) {
    e.preventDefault();
    const inputRow = `   <tr class="addInpute">
<td class="action"></td>
<td class="id">${newId}</td>
<td class="s_date"><input class="start" type="date"></td>
<td class="e_date"><input class="end" type="date"></td>
<td class="month_year"></td>
<td class="ex_date">from-<input class="sartexclude" type="date" >
to-<input class="endexclude" type="date" ></td>
<td class="no_of_days"></td>
<td class="lead_count"><input class="count" type="number"></td>
<td class="drr"></td>
<td class="t_update"><button class="btn save_btn">Save</button>
<button class="btn cancle_btn">cancle</button></td>
</tr>`;

    tableBody.insertAdjacentHTML("afterbegin", inputRow);
    newId++;
    const save_btn = document.querySelector(".save_btn");
    const id = document.querySelector(".id");

    const cancle_btn = document.querySelector(".cancle_btn");
    const start = document.querySelector(".start");
    const end = document.querySelector(".end");

    const count = document.querySelector(".count");
    const addInpute = document.querySelector(".addInpute");
    const t_update = document.querySelector(".t_update");
    const sartexclude = document.querySelector(".sartexclude");
    const endexclude = document.querySelector(".endexclude");
    const lead_count = document.querySelector(".lead_count");





    const removeitem = function () {
        tableBody.removeChild(addInpute);
    }
    const updateTime = function () {
        const newtime = new Date();
        const day = newtime.getDate();
        const month = newtime.getMonth();
        const year = newtime.getFullYear();
        const now = `${year}-${(month + 1)}-${day}`;

        return now;
    }

    


    //for data submission
    save_btn.addEventListener('click', function () {
        let ex_date = '';
        const startdate = new Date(start.value);
        const endtdate = new Date(end.value);

       
        const start_ex_date = new Date(sartexclude.value);
        const end_ex_date = new Date(endexclude.value);
        // const Drr = Math.abs(Number(count.value) / Number(nodays));


        // validation part
        if ((+startdate) > (+endtdate)) {

            const text = 'End Date always ahead of start Date!! try again!!'
            validationText(text);
            return;
        }
        if ((+start_ex_date) < (+startdate) || (+start_ex_date) > (+endtdate) || (+end_ex_date) < (+startdate) || (+end_ex_date) > (+endtdate) || (+start_ex_date) > (+end_ex_date)) {
            const text = 'Excluded Date always between in the range of start and end date!! try again!!'
            validationText(text);
            return;

        }
        //validation function
        function validationText(text) {
            const inputText = `<tr class="validation">
            <td class="text" colspan="9">${text}</td>
            <td ><button class="btn back_btn">back</button></td>
            </tr>`;
            addInpute.insertAdjacentHTML("afterend", inputText);

            removeitem();
            const back_btn = document.querySelector(".back_btn");
            const validation = document.querySelector(".validation");
           
            back_btn.addEventListener('click', function () {
                tableBody.removeChild(validation);
                newId--;
            })
        }

        function no_days(start, end, start_ex, end_ex) {

            const day = Math.abs((+start) - (+end)) / (1000 * 60 * 60 * 24);
            const exDay = Math.abs((+start_ex) - (+end_ex)) / (1000 * 60 * 60 * 24);
            return day - exDay;
        }
        function no_days2(start, end) {

            const day = Math.abs((+start) - (+end)) / (1000 * 60 * 60 * 24);
           
            return day;
        }
        const nodays=sartexclude.value==''||endexclude.value==''?no_days2(startdate,endtdate):no_days(startdate, endtdate, start_ex_date, end_ex_date);

        function dateRange(start, end) {
            for (i = start.getDate(); i <= end.getDate(); i++) {
                ex_date += `${start.getFullYear()}-${start.getMonth() + 1}-${i} ${i == end.getDate() ? '' : ','}`
            }
            return ex_date;

        }


        const inpuRow = `<tr class="submitRow">
        <td></td>
        <td>${id.textContent}</td>
        <td>${start.value}</td>
        <td>${end.value}</td>
        <td>${startdate.getMonth() + 1}</td>
        <td>${dateRange(start_ex_date, end_ex_date)}</td>
        <td>${nodays}</td> 
        <td>${count.value}</td>
        <td>${Math.ceil(Math.abs(Number(count.value) / Number(nodays)))}</td>
        <td >${updateTime()}</td>
        </tr>`;

        addInpute.insertAdjacentHTML("afterend", inpuRow);
        const submitRow = document.querySelector(".submitRow");
        if (id.textContent % 2 == 0) {
            submitRow.classList.add("color-1");
        } else {
            submitRow.classList.add("color-2");
        }

        removeitem();
    });
    cancle_btn.addEventListener('click', function () {
        removeitem();
        newId--;
    })

});



