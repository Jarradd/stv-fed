import React from "react";
import './searchProgramme.css'

class SearchProgramme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: ''
        };
    }

    componentDidMount() {
        if (localStorage.getItem('searchedProgrammes') === null) {
            localStorage.setItem('searchedProgrammes', JSON.stringify(this.state.searchFilter));
        }
        this.setState({
            searchFilter: JSON.parse(localStorage.getItem('searchedProgrammes'))
        });
    }

    handleChange = event => {
        let searchFilter = event.target.value;
        localStorage.setItem('searchedProgrammes', JSON.stringify(searchFilter));
        this.setState({
            searchFilter: searchFilter,
            }, () =>
            this.globalSearch()
        );
    };

    globalSearch() {
        let searchInput = this.state.searchFilter;
        const filteredData = this.props.data.filter(value => {
            return (
                value.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        });
        localStorage.setItem('availableProgrammes', JSON.stringify(filteredData));
        this.props.handleSetData(filteredData);
    };

    render() {
        return (
            <div className="programmeSearch">
                <input
                    type="text"
                    className="programmeSearch-Filter"
                    value={this.state.searchFilter}
                    onChange={this.handleChange}
                    placeholder="Search Programme by name:"
                />
            </div>
        );
    }
}
export default SearchProgramme;
