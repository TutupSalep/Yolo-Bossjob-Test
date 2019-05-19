import React, {Component} from 'react';
import './Content.css'
import Pagination from "./Pagination";
import Graduation from "../../../assets/images/Graduation.png";
import Briefcase from "../../../assets/images/Briefcase.png";
import Clock from "../../../assets/images/Clock.png";
import Pin from "../../../assets/images/Pin.png";


const ColoredLine = () => (
    <hr
        style={{
            color: "#DEDEDE",
            backgroundColor: "#DEDEDE",
            height: 1,
            width: 300,
            borderWidth: 0
        }}
    />
);

class Content extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:null
        };
        this.myRef=0;
        var exampleItems = [...Array(this.props.data.total_num  === 0 ? 1 : this.props.data.total_num).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
        this.props.pagination(pageOfItems);
    }

    scrollToMyRef = () => window.scroll({top: 0, left: 0, behavior: 'smooth' });

    componentWillMount() {
        this.setState({data:this.props.data});
    }

    componentWillReceiveProps(nextProps) {
        // console.log('props content',nextProps);
        this.setState({data:nextProps.data});
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.data.total_num !== prevProps.data.total_num) {
            var exampleItems = [...Array(this.props.data.total_num  === 0 ? 1 : this.props.data.total_num).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
            this.setState({
                exampleItems: exampleItems,
                pageOfItems: []
            });
            this.scrollToMyRef()
        }
        if (this.state.pageOfItems !== prevState.pageOfItems) {
            this.scrollToMyRef()
        }
    }

    render() {
        if (this.state.data) {
            var now = new Date();
            var data = this.state.data;
            // var totalPages = [];
            // for (let i = 0; i < data.total_num; i++) {
            //     totalPages.push(i+1);
            // }
            // console.log('example item',totalPages);
            return(
                <div className="content" ref={ (ref) => this.myRef=ref }>
                    <div className="headList">
                        <div>
                            <text className="totalJobs">{data.total_num} jobs found</text>
                            <ColoredLine/>
                        </div>
                    </div>
                    {data.jobs.map((datas,i) => {
                        return (
                            <div className="list" key={i}>
                                <div>
                                    <div className='listContent'>
                                        <div style={{width:200, fontWeight:'bold', fontSize:14}}><text>{datas.job_title}</text></div>
                                        <div style={{fontSize:14}}><text>₱{convertNumber(datas.salary_range_from)} - ₱{convertNumber(datas.salary_range_to)}</text></div>
                                    </div>
                                    <div className='listContent'>
                                        <div style={{fontSize:14, width: 125}}><img src={Pin} className="icon" /><text>  {datas.job_location}</text></div>
                                        <div style={{fontSize:14, width: 125}}><img src={Briefcase} className="icon" /><text>  {datas.xp_lvl}</text></div>
                                        <div style={{fontSize:14, width: 50}}></div>
                                    </div>
                                    <div className='listContent'>
                                        <div style={{fontSize:14, width: 125}}><img src={Graduation} className="icon" /><text>  {datas.degree}</text></div>
                                        <div style={{fontSize:14, width: 125}}><img src={Clock} className="icon" /><text>  {datas.job_type}</text></div>
                                        <div style={{fontSize:14, width: 50}}></div>
                                    </div>
                                    <div className='listContent' style={{height:40}}>
                                        <div style={{fontSize:14, width: 50}}><img src={datas.company_logo} className="Logo" /></div>
                                        <div style={{fontSize:14, width: 150}}><text>  {datas.company_name}</text></div>
                                        <div style={{fontSize:14, width: 100, textAlign: 'end', color:'#BCBCBC'}}><text>{timeConvert(now.getTime(),new Date(datas.updated_at))}</text></div>
                                    </div>
                                    <ColoredLine/>
                                </div>
                            </div>
                        )
                    })}
                    <div className="headList">
                            <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                </div>
            );
        }
        else {
            return null
        }
    }
}

function convertNumber(value) {
    var thousand = 1000;
    var million = 1000000;
    var billion = 1000000000;
    var trillion = 1000000000000;
    if (value < thousand) {
        return String(value);
    }

    if (value >= thousand && value <= 1000000) {
        return  Math.round(value/thousand) + 'k';
    }

    if (value >= million && value <= billion) {
        return Math.round(value/million) + 'M';
    }

    if (value >= billion && value <= trillion) {
        return Math.round(value/billion) + 'B';
    }

    else {
        return Math.round(value/trillion) + 'T';
    }
}

function timeConvert(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

export default Content