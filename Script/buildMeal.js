function convertNameValue(str) {
    switch(str){
        case 'calories':        return 'קלוריות';
        case 'proteins':        return 'חלבון';
        case 'carbohydrates':   return 'פחמימות';
        case 'fats':            return 'שומן';
        case 'saturated_fat':   return 'שומן רווי';
        case 'trans_fat':       return 'שומן טראנס';
        case 'cholesterol':     return 'כולוסטרול';
        case 'fiber':           return 'סיבים תזונתיים';
        case 'sugar':           return 'סוכר';
        case 'sodium':          return 'נתרן';
        case 'calcium':         return 'סידן';
        default :               return null;
    }
}
function fixNumber(n){
    if((n % 1) === 0)
        return n;
    else
        return (n.toFixed(1));
}
function onSppiner(){
    document.getElementById("spinner").style.display="block";
}
function offSpinner(){
    document.getElementById("spinner").style.display="none";
}
/*חיפוש עם השלמה אוטומטית*/
class SearchItem extends React.Component {
    state = {
        nameItems:[],
        selcetIdItem: -1,
        displayList: "none",
    }
    getNames=(str)=>{
        if(str==='')
            return;
        onSppiner();
        $.post("./main.php",{action:"autoComplete",str:str,len:str.length})
        .done((data)=>{
            this.setState({nameItems:JSON.parse(data),displayList:"block"});
            offSpinner();
        })
        .fail((error)=>{
            console.log(error);
            offSpinner();
        })
    }
    onSelect=(id)=>{
        this.setState({selcetIdItem:id,nameItems:[],displayList:"none"})
    }
    render() { 
        return (
            <div class="my-meals-wrapper" style={{display:this.props.display}}>
                <div class="my-meals-content">
                    <button class="btn-close" onClick={this.props.onClose}>X</button>
                    <div class="search-item">
                        <input type="text" id="auto-complete-input" placeholder="חפש פריט" onKeyUp={(e)=>{this.getNames(e.target.value)}}/>
                        <ul class="auto-complete-list" style={{display: this.state.displayList}}>
                            {
                            this.state.nameItems.map((el)=>{
                                return <li id={el.id} key={el.id} onClick={(e)=>{this.onSelect(e.target.id)}} >{el.name}</li>
                            })
                            }
                        </ul>
                    </div>
                    {<ViewItem item={this.state.selcetIdItem}/>}
                </div>
                <div id='spinner' class="spinner"/>
            </div>
        );
    } 
}
/*מחלקה המציגה את המוצר*/
class ViewItem extends React.Component {
    state={
        item:{},
        items:[],
        weight: 100,
        display:"none"
    }
    componentWillReceiveProps(nextProps) {
        this.getItem(nextProps.item);
    }
    getItem=(id)=>{
        if(id==-1)
            return;
            onSppiner();
        $.post("./main.php",{action:"getItem",id_item:id})
        .done((data)=>{
            this.setState({item:JSON.parse(data),display:"table"});
            offSpinner();
        })
        .fail((error)=>{
            console.log(error);
            offSpinner();
        })
    }
    onChangeWeigth(w){
        if(w===''){
            this.setState({weight:100});
            return;
        }
        this.setState({weight:w});
    }
    onAddItem=()=>{
        let arrItems = this.state.items;
        let objItems = this.state.item;
        objItems.weight = this.state.weight;
        arrItems.push(this.state.item);
        this.setState({items:arrItems,display:"none",weight:100});
        document.getElementById('weigth-input').value="";
    }
    handleOnClearItems=()=>{
        this.setState({items:[]});
    }
    render(){
        return(
            <div style={{marginTop:'49px',marginRight:'5px'}}>
                <table class="preview-item-table" style={{display:this.state.display}}>
                    <thead>
                        <tr><th>{this.state.item.name}</th></tr>
                        <tr><th>{this.state.item.company!=0 ? this.state.item.company : null}</th></tr>
                        <tr><th><input id="weigth-input" type="number"min="1" step="1" placeholder="גרם"onChange={(e)=>{this.onChangeWeigth(e.target.value)}}/></th></tr>
                    </thead>
                    <tbody>
                    {
                        Object.entries(this.state.item).map(([key,value],i)=>{
                            return (
                                convertNameValue(key) != null ?
                                <tr key={i}><td>{convertNameValue(key)}</td><td>{fixNumber(value*((this.state.weight/100)))}</td></tr>
                                : null);
                        })
                    }
                    </tbody>
                    <tr><th><button class="btn-add-item" onClick={this.onAddItem}>הוסף לתפריט</button></th></tr>
                </table>
                <ViewMeal items={this.state.items} clearItems={this.handleOnClearItems}/>
            </div>
        );
    }
}
class ViewMeal extends React.Component{
    state={
        meal: {},
        display: "none"
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.items.length==0){
            return;
        }
        let meal = {
            'calories': 0,
            'proteins': 0,
            'carbohydrates': 0,
            'fats': 0,
            'saturated_fat': 0, 
            'trans_fat': 0, 
            'cholesterol': 0,   
            'fiber': 0,         
            'sugar': 0,     
            'sodium': 0,     
            'calcium': 0,  
        }
        nextProps.items.map((item)=>{
            Object.entries(item).map(([key,value])=>{
                if(convertNameValue(key)!=null)
                    meal[key]+=parseFloat(fixNumber(value*(item.weight/100)));
                })
        })
        this.setState({meal:meal,display:"table"});
    }
    onSaveMeal=()=>{
        if(this.props.items.length==0)
            return;
        onSppiner();
        let arrMeal = [];
        this.props.items.forEach(el => {
            arrMeal.push({id:el.id,weight:el.weight});
        });
        let objUser = JSON.parse(localStorage.getItem('user'));
        $.post("./main.php",{
            action:'save_meal',
            meal_item: JSON.stringify(arrMeal),
            id_user: objUser.id
        })
        .done((data)=>{
            if(data==1){
                alert("הארוחה נשמרה בהצלחה");
                this.setState({meal:{},display:"none"});
                this.props.clearItems();
            }
            offSpinner();
        })
        .fail((error)=>{
            console.log(error);
            offSpinner();
        })
    }
    onClearMeal=()=>{
        let meal = {
            'calories': 0,
            'proteins': 0,
            'carbohydrates': 0,
            'fats': 0,
            'saturated_fat': 0, 
            'trans_fat': 0, 
            'cholesterol': 0,   
            'fiber': 0,         
            'sugar': 0,     
            'sodium': 0,     
            'calcium': 0,  
        }
        this.setState({meal:meal});
        this.props.clearItems();
    }
    render(){
        return(
            <div class="view-meal-box" style={{display:this.state.display}}>
                <table class="preview-item-table">
                    <thead>
                    <tr><th>הארוחה שלך</th></tr>
                    </thead>
                    <tbody>
                    {
                        Object.entries(this.state.meal).map(([key,value],i)=>{
                            return (
                                convertNameValue(key) != null ?
                                <tr key={i}><td>{convertNameValue(key)}</td><td>{value.toFixed(1)}</td></tr>
                                : null);
                        })
                    }
                    <tr><th colspan="2"><button class="btn-add-item" style={{backgroundColor:"rgba(0,0,255,0.7)"}} onClick={this.onClearMeal}>נקה</button></th></tr>
                    <tr><th colspan="2"><button class="btn-add-item" style={{backgroundColor:"rgba(255,0,0,0.7)"}} onClick={this.onSaveMeal}>שמור ארוחה</button></th></tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
