import React from 'react';
import './App.css';
import data from  './data/programmes'
import TableProgramme from './tableProgramme/tableProgramme'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: data.results,
            filterData: [],
        };
    };

    componentDidMount() {
        if (localStorage.getItem('availableProgrammes') === null) {
            localStorage.setItem('availableProgrammes', JSON.stringify(this.state.sourceData));
        }
        this.setState({
            filterData: JSON.parse(localStorage.getItem('availableProgrammes'))
        });
    };

    handleSetData = sourceData => {
        this.setState({
            filterData: sourceData,
        });
    };

    render() {
        return (
            <div className="App">
                <TableProgramme
                    data={this.state.filterData}
                    handleSetData={this.handleSetData}
                />
            </div>
        );
    }
}
export default App;
