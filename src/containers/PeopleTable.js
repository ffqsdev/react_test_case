import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getPeopleTableData, deletePeople } from "../actions/PeopleTableActions"
import { createPeople, updatePeople } from "../actions/PeopleFormActions"

import { LOGIN_PAGE } from "../constants/routes"
import getCurrentUserId from "../utils/isAuth"

import PeopleForm from "./PeopleForm"
import { 
    Modal, ModalHeader, ModalBody, Table,
    Pagination, PaginationItem, PaginationLink, Button 
} from "reactstrap"


class PeopleTable extends Component {
    state = {
        page: 0,
        perPage: 2,
        sortedBy: "",
        isReverse: false,
        showForm: false,
        form_item: {}
    }

    componentDidMount() {
        const {page, perPage} = this.state
        this.props.getPeopleTableData(page, perPage)
    }

    toggleForm = () => {
        this.setState({showForm: !this.state.showForm})
        if (this.state.showForm)
            this.setState({form_item: {}})
    }

    showEditForm = (item) => {
        this.setState({form_item: item})
        this.toggleForm()
    }

    modalTitle = () => {
        if (this.state.form_item.id)
            return "Update people"
        return "Create People"
    }

    submitHandler = (form_data) => {
        const { id, name, gender, age } = form_data
        const { updatePeople, createPeople } = this.props

        if(id) {
            updatePeople(id, name, gender, age)
        } else {
            createPeople(name, gender, age)
        }
        this.toggleForm()
    }

    deletePeople = (id) => {
        this.props.deletePeople(id)
    }

    sortedData = (data, colname, isReverse) => {
        let sortedData = [...data]
        if (colname) {
            sortedData.sort((a, b) => (""+a[colname]).localeCompare(b[colname]))
        }
        if (isReverse) {
            sortedData = sortedData.reverse()
        }
        return sortedData
    }

    changeSorted = (colname) => {
        let state = {sortedBy: colname}
        if (this.state.sortedBy === colname) {
            state.isReverse = !this.state.isReverse
        }
        this.setState(state)
    }

    changePage = (page) => {
        this.setState({page: page})

        const {perPage} = this.state
        this.props.getPeopleTableData(page, perPage)
    }

    renderPagination = () => {
        const { data } = this.props.peopleTable
        const { page, perPage } = this.state

        let pages = Math.ceil(data.length/perPage)

        let template = []
        for(let i = 0; i < pages; i++) {
            template.push((
                <PaginationItem key={i} active={i === page}>
                    <PaginationLink href="#" onClick={() => this.changePage(i)}>{i + 1}
                    </PaginationLink>
                </PaginationItem>
            ))
        }
        return template
    }

    renderTable = () => {
        const { data, isFetching, error } = this.props.peopleTable
        const { page, perPage, sortedBy, isReverse} = this.state

        if (isFetching) {
            return(
                <p>Loading...</p>
            )
        }

        if (error) {
            return(
                <p>Error: {error.message}</p>
            )
        }

        let rows = this.sortedData(data, sortedBy, isReverse).map((item, index) => {
            if (index >= page*perPage && index < page*perPage + perPage) {
                return (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>
                            <Button color="primary" onClick={() => this.showEditForm(item)}>Edit</Button>
                            {" "}
                            <Button color="danger" onClick={() => this.deletePeople(item.id)}>Delete</Button>
                        </td>
                    </tr>
                )
            }
            return null
        })

        return(
            <Fragment>
                <Table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => this.changeSorted("")}>Index</th>
                            <th onClick={() => this.changeSorted("name")}>Name</th>
                            <th onClick={() => this.changeSorted("gender")}>Gender</th>
                            <th onClick={() => this.changeSorted("age")}>Age</th>
                            <th><Button onClick={this.toggleForm} color="success">+ Add</Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                <Pagination>
                    {this.renderPagination()}
                </Pagination>
            </Fragment>
        )
    }

    render() {
        const { showForm, form_item } = this.state

        return(
            <Fragment>
                {!getCurrentUserId() && <Redirect to={LOGIN_PAGE}/>}

                <Modal isOpen={showForm} toggle={this.toggleForm}>
                    <ModalHeader toggle={this.toggleForm}>{this.modalTitle()}</ModalHeader>
                    <ModalBody>
                        <PeopleForm
                            id={form_item.id}
                            name={form_item.name}
                            gender={form_item.gender}
                            age={form_item.age}
                            submitHandler={this.submitHandler}
                            buttonText="Save"
                        />
                    </ModalBody>
                </Modal>
                <div className="people__table">
                    {this.renderTable()}
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = store => {
    return {
        peopleTable: store.peopleTable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPeopleTableData: (page, perPage) => dispatch(getPeopleTableData(page, perPage)),
        createPeople: (name, gender, age) =>
            dispatch(createPeople(name, gender, age)),
        updatePeople: (id, name, gender, age) =>
            dispatch(updatePeople(id, name, gender, age)),
        deletePeople: (id) => 
            dispatch(deletePeople(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleTable)
