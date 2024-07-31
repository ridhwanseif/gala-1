import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { FileTextOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Spin, Alert } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

export default function Shule() {

  const [searchText, setSearchText] = useState('');
  const [schoolRecord, setSchooleRecord] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const {
    data: schools,
    isLoading: isLoadingSchool,
    isError: isErrorSchool,
    error: fetchError,
  } = useQuery('schools', fetchMwatwaraSchools);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Jina la shule',
      dataIndex: 'school_name',
      key: 'school_name',
      width: '30%',
      ...getColumnSearchProps('school_name'),
    },
    {
      title: 'Nambari ya usajili ya shule',
      dataIndex: 'school_reg_number',
      key: 'school_reg_number',
      width: '20%',
      ...getColumnSearchProps('school_reg_number'),
    },
    {
      title: 'kata',
      dataIndex: 'ward',
      key: 'ward',
      ...getColumnSearchProps('ward'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Halmashauri',
      dataIndex: 'council',
      key: 'council',
      width: '20%',
      ...getColumnSearchProps('council'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render: (text,record,index) => {
        return (
          <Link>
            <FileTextOutlined onClick={()=>setSchooleRecord(record)} />
          </Link>
        );
      },
    },
  ];

  if (isLoadingSchool) {
    return <Spin className='d-flex-center' tip="Loading..." />;
  }

  if (isErrorSchool) {
    return <Alert className='flex-center' message="Error" description={fetchError.message} type="error" showIcon />;
  }


  return (
    <>
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h4>Maelezo ya Shule</h4>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">DataTables</li>
              </ol>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-4">
                <Table
                  columns={columns}
                  dataSource={schools}
                  className='custom-table'
                />
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
      </div>
    </>
  )
}
