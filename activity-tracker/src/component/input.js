import React from "react";


const MONTHS = {
    1: { name: 'January', days: 31},
    2: { name: 'February', days: 28},
    3: { name: 'March', days: 31 },
    4: { name: 'April', days: 30 },
    5: { name: 'May', days: 31},
    6: { name: 'June', days: 30},
    7: { name: 'July', days: 31},
    8: { name: 'August', days: 31},
    9: { name: 'September', days: 30},
    10: { name: 'October', days: 31},
    11: { name: 'November', days: 30},
    12: { name: 'December', days: 31},
}
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            textToShow: [],
            isOpen: false,
            currentMonth: {},
            currentMonthDays: [],
             active:[],
        }
    }

    componentDidMount = () => {
        const month = new Date().getMonth() + 1;
        const currentMonth = MONTHS[month];
        const arr = []
        for(let i=1; i<= currentMonth.days; i++) {
            arr.push(i);
        }
        this.setState({
            currentMonthDays: arr
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const month = new Date().getMonth() + 1;
        const { text } = this.state;
        this.setState({
            isOpen: true,
            textToShow: [...this.state.textToShow, text],
            text: '',
            currentMonth: MONTHS[month],
        })
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    handleClick = (i) => {

        this.setState({
            active : [...this.state.active,i],
            
        })
    }

    handleDelete = (index) => {
       this.state.textToShow.splice(index,1)
        this.setState({
           textToShow: this.state.textToShow
        })
    }

    render(){
        const { currentMonth, currentMonthDays } = this.state;
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange}
                className='input'
                type='text'
                placeholder='e.g. Coding'
                value={this.state.text}
                />
                <input
                className="input-btn"
                type='submit'
                value='Add activity'
                
                /> 
             </form>
             <div >
                { this.state.isOpen && (
                    <div>
                    {
                        this.state.textToShow?.map((item,index) => (
                            < div className="activity">
                            <div className="month">
                            <h1>{item}</h1>
                            <p className="month">{currentMonth.name}</p>
                            </div>
                            <div className="day">
                            {
                                currentMonthDays.map((day,i) => (
                                    <button 
                                    key={i}
                                    onClick={()=>this.handleClick(i)}
                                    className={(this.state.active.includes(i) && this.state.isOpen) ? 'active': ''}
                                    >{day}</button>
                                ))
                            }
                            </div>
                            <div>
                                <button 
                                onClick={()=>this.handleDelete(index)}
                                >X</button>
                            </div>
                            </div>
                        ))
                    }
                    </div>
                
                )
    }
             </div>
            </>
        )
    }
}

export default Main