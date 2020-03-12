import React from 'react';
import data from '../data/programmes';
import SearchProgramme from "../searchProgramme/searchProgramme";
import AddProgramme from '../addProgramme/addProgramme';
import './tableProgramme.css'
import removeItem from "../error.svg";

class tableProgramme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: data.results,
            filterData: [],
            id: '',
            name: '',
            shortDescription: '',
            active: '',
            sort: {
                column: null,
                direction: 'desc',
            }
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

    onSort = (column) => (e) => {

        if (this.state.editing === true) {
            this.setState(prevState => ({
                editing: !prevState.editing,
            }));
        }

        const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
        const sortedData = this.state.filterData.sort((a, b) => {
            if (column === 'name') {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            } else {
                return a.id - b.id;
            }
        });

        if (direction === 'desc') {
            sortedData.reverse();
        }

        localStorage.setItem('availableProgrammes', JSON.stringify(sortedData));
        this.setState({
            data: sortedData,
            sort: {
                column,
                direction,
            }
        });
    };

    setArrow = (column) => {
        let className = 'sort-direction';
        if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
        }
        return className;
    };

    handleSetData = sourceData => {
        this.setState({
            filterData: sourceData,
        });
    };

    editProgrammes(index) {
        const programmess = this.state.filterData.map((i,item) => ({
            ...i, editing : item.editing && i===item
        }));

        if (this.state.filterData[index].editing === true) {
            programmess[index].editing = undefined;
        } else if (this.state.filterData[index].editing === undefined) {
            programmess[index].editing = true;
        }

        localStorage.setItem('availableProgrammes', JSON.stringify(programmess));
        this.setState({
            filterData: programmess,
            id: '',
            name: '',
            shortDescription: '',
            active: ''
        });
    };

    updateAddProgramme = (e) => {

        let value = e.target.value;
        this.setState({
            [e.target.id]: value,
            [e.target.name]: value,
            [e.target.shortDescription]: value,
            [e.target.active]: value
        });

    };

    save(index, e) {

        const programmes = this.state.filterData.map(item => ({ ...item }))

        if ( this.state.id !== '' ) {
            programmes[index].id = JSON.parse(this.state.id);
        }
        if ( this.state.name !== '' ) {
            programmes[index].name = this.state.name;
        }
        if ( this.state.shortDescription !== '' ) {
            programmes[index].shortDescription = this.state.shortDescription;
        }
        if ( this.state.active !== '' ) {
            programmes[index].active = this.state.active;
        }

        programmes[index].editing = undefined;

        localStorage.setItem('availableProgrammes', JSON.stringify(programmes));
        this.setState(prevState => ({
            filterData: programmes
        }));
    };

    remove = (id) => {
        if (this.state.editing === true) {
            this.setState(prevState => ({
                editing: !prevState.editing,
            }));
        }
        const removedProgramme = this.state.filterData.filter((results,index) =>
            results.id !== id
        );
        localStorage.setItem('availableProgrammes', JSON.stringify(removedProgramme));
        this.setState( {
            filterData: removedProgramme
        });
    };

    render() {
        return (
            <div>
                <SearchProgramme
                    data={this.state.sourceData}
                    handleSetData={this.handleSetData}
                />
                <AddProgramme
                    data={this.state.filterData}
                    handleSetData={this.handleSetData}
                />
                <div className="allProgrammes">
                    <div className='programmeHeadings'>
                        <div className="editItem">Edit Item</div>
                        <div className="id" onClick={this.onSort('id')}>
                            ID <span className={this.setArrow('id')}/>
                        </div>
                        <div className="name" onClick={this.onSort('name')}>
                            Name <span className={this.setArrow('name')}/>
                        </div>
                        <div className="shortDesc">Description</div>
                        <div className="active">Active Status</div>
                        <div className="removeItem">Remove Item</div>
                    </div>
                    <div className="programmeContent">
                    {this.state.filterData.map((item,key) => {
                        return (
                            <div className="groupedProgrammes" id={key} key={key}>
                                <div className='programmeHeadings-Mobile'>
                                    <div className="editItem">Edit Item</div>
                                    <div className="id" onClick={this.onSort('id')}>
                                        ID <span className={this.setArrow('id')}/>
                                    </div>
                                    <div className="name" onClick={this.onSort('name')}>
                                        Name <span className={this.setArrow('name')}/>
                                    </div>
                                    <div className="shortDesc">Description</div>
                                    <div className="active">Active Status</div>
                                    <div className="removeItem">Remove Item</div>
                                </div>
                                <div className={`programmes ${!item.active ? "inactive" : "active"}`}>
                                <div className="edit">
                                    {item.editing ? <button className="save" onClick={this.save.bind(this, key)}>Save</button> : ''}
                                    <button className={item.editing ? 'cancelRow' : 'editRow'} onClick={this.editProgrammes.bind(this, key)}>{item.editing ? 'Cancel' : 'Edit'}</button>
                                </div>
                                <div className="id">
                                    {item.editing ? <input type="number" name="id" className="editableInput" defaultValue={item.id} onChange={this.updateAddProgramme} /> : item.id}
                                </div>
                                <div className="name">
                                    {item.editing ? <input type="text" name="name" className="editableInput" defaultValue={item.name} onChange={this.updateAddProgramme} /> : item.name}
                                </div>
                                <div className="shortDesc">
                                    {item.editing? <input type="text" name="shortDescription" className="editableInput" defaultValue={item.shortDescription} onChange={this.updateAddProgramme} /> : item.shortDescription}
                                </div>
                                <div className="active">
                                    {item.editing ? <input type="text" name="active" className="editableInput" defaultValue={item.active} onChange={this.updateAddProgramme} /> : JSON.stringify(item.active)}
                                </div>
                                <div className="removeItem" onClick={() => this.remove(item.id)}><img src={removeItem} alt="removeItem"/></div>
                            </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        )
    }
}
export default tableProgramme;
