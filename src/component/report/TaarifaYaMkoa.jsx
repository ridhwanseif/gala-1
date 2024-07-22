import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { fetchRipotiYaShule } from '../../api/ripoti';
import { Space, Table, Tag, Tabs, Input, Button } from 'antd';
import { RipotiYaShuleChart } from '../../utils/Chart';

export default function TaarifaYaMkoa() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [school, setSchool] = useState();
  const [schoolNo, setSchoolNo] = useState();


  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: schools, isLoading: isLoadingSchool, isError: isErrorSchool } = useQuery('schools', fetchMwatwaraSchools);

  const { data: schoolReport, isLoading: isLoadingSchoolReport, isError: isErrorSchoolReport } =
    useQuery(['schoolReport', month, year, schoolNo], fetchRipotiYaShule, { enabled: !!year && !!month && !!schoolNo });


  // console.log(JSON.stringify(schoolReport, null, 2))

  const columns = [
    {
      title: 'Na',
      dataIndex: 'na',
      key: 'na',
    },
    {
      title: 'Halmashauri',
      dataIndex: 'halmashauri',
      key: 'halmashauri',
    },
    {
      title: 'Waliosajiliwa',
      children: [
        {
          title: 'WAV',
          dataIndex: 'registeredWAV',
          key: 'registeredWAV',
        },
        {
          title: 'WAS',
          dataIndex: 'registeredWAS',
          key: 'registeredWAS',
        },
        {
          title: 'JUMLA',
          dataIndex: 'registeredJUM',
          key: 'registeredJUM',
        },
      ],
    },
    {
      title: 'Waliofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'completedWAV',
          key: 'completedWAV',
        },
        {
          title: 'WAS',
          dataIndex: 'completedWAS',
          key: 'completedWAS',
        },
        {
          title: 'JUMLA',
          dataIndex: 'completedJUM',
          key: 'completedJUM',
        },
        {
          title: '%',
          dataIndex: 'completedPercent',
          key: 'completedPercent',
        },
      ],
    },
    {
      title: 'Wasiofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'notCompletedWAV',
          key: 'notCompletedWAV',
        },
        {
          title: 'WAS',
          dataIndex: 'notCompletedWAS',
          key: 'notCompletedWAS',
        },
        {
          title: 'JUMLA',
          dataIndex: 'notCompletedJUM',
          key: 'notCompletedJUM',
        },
        {
          title: '%',
          dataIndex: 'notCompletedPercent',
          key: 'notCompletedPercent',
        },
      ],
    },
  ];
  const data1 = [
    {
      key: '1',
      na: '1',
      halmashauri: 'MASASI DC',
      registeredWAV: 14,
      registeredWAS: 4,
      registeredJUM: 18,
      completedWAV: 14,
      completedWAS: 4,
      completedJUM: 18,
      completedPercent: '100.00%',
      notCompletedWAV: 0,
      notCompletedWAS: 0,
      notCompletedJUM: 0,
      notCompletedPercent: '0.00%',
    },

  ]

  const [size, setSize] = useState('small');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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


  const colsKusoma = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      key: 'sn',
      // ...getColumnSearchProps('sn'),
    },
    {
      title: 'Jina',
      dataIndex: 'jina',
      key: 'jina',
      width: '18%',
      ...getColumnSearchProps('jina'),
    },
    {
      title: 'Jisia',
      dataIndex: 'jisia',
      key: 'jisia',
      ...getColumnSearchProps('jisia'),
    },
    {
      title: 'Sauti za herufi	',
      dataIndex: 'sauti',
      key: 'sauti',
    },
    {
      title: 'Ubora wa Ufaulu	',
      dataIndex: 'ufauluSauti',
      key: 'ufauluSauti',
    },
    {
      title: 'Maneno ya kubuni',
      dataIndex: 'kubuni',
      key: 'kubuni',
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufaulukubuni',
      key: 'ufaulukubuni',
    },
    {
      title: 'Kusoma Kwa Ufahamu',
      dataIndex: 'ufahamu',
      key: 'ufahamu',
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufauluUfahamu',
      key: 'ufauluUfahamu',
    },
    {
      title: 'Jumla',
      dataIndex: 'jumla',
      key: 'jumla',
      ...getColumnSearchProps('jumla'),
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
  ];

  const colsKuandika = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      key: 'sn',
      // ...getColumnSearchProps('sn'),
    },
    {
      title: 'Jina',
      dataIndex: 'jina',
      key: 'jina',
      width: '18%',
      ...getColumnSearchProps('jina'),
    },
    {
      title: 'Jisia',
      dataIndex: 'jisia',
      key: 'jisia',
      ...getColumnSearchProps('jisia'),
    },
    {
      title: 'Imla',
      dataIndex: 'sauti',
      key: 'sauti',
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufauluSauti',
      key: 'ufauluSauti',
    },
    {
      title: 'Ubora wa Imla',
      dataIndex: 'sauti',
      key: 'sauti',
    },
    {
      title: 'Ubora wa Ufaulu	',
      dataIndex: 'ufauluSauti',
      key: 'ufauluSauti',
    },
    {
      title: 'Kupisijio Mistari Maeneo Yaliyochanganyika',
      dataIndex: 'sauti',
      key: 'sauti',
    },
    {
      title: 'Alama za uandishi',
      dataIndex: 'ufauluSauti',
      key: 'ufauluSauti',
    },
    {
      title: 'Ubora wa Ufuafu',
      dataIndex: 'sauti',
      key: 'sauti',
    },
    {
      title: 'Kutambua Majina Ya Vitu',
      dataIndex: 'ufauluSauti',
      key: 'ufauluSauti',
    },
  ];

  const colskuhesabu = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      key: 'sn',
      // ...getColumnSearchProps('sn'),
    },
    {
      title: 'Jina',
      dataIndex: 'jina',
      key: 'jina',
      width: '18%',
      ...getColumnSearchProps('jina'),
    },
    {
      title: 'Jisia',
      dataIndex: 'jisia',
      key: 'jisia',
      ...getColumnSearchProps('jisia'),
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Jumla',
      dataIndex: 'jumla',
      key: 'jumla',
      ...getColumnSearchProps('jumla'),
    },
    {
      title: 'Utambuzi wa Namba',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Ubora wa Ufaulu',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Kujumulisha na kutoa',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Ubora wa Ufuafu',
      dataIndex: 'ufauluJumla',
      key: 'ufauluJumla',
      ...getColumnSearchProps('ufauluJumla'),
    },
  ];

  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h4>Taarifa ya Mkoa</h4>
            </div>
            <div class="col-sm-6">
              <div className='row'>
                <div className='col-sm-12'>
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">DataTables</li>
                  </ol>
                </div>
              </div>

              <div className="row mt-3">

                <div className="col-sm-6 float-right">
                  <div className="form-group">
                    <label>Mwezi</label>
                    {isLoadingMonth ? (
                      <p>Loading...</p>
                    ) : isErrorMonth ? (
                      <p>Error loading months.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <option selected="selected" >--Chagua--</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-6 float-right">
                  <div className="form-group">
                    <label>Mwaka</label>
                    {isLoadingYear ? (
                      <p>Loading...</p>
                    ) : isErrorYear ? (
                      <p>Error loading years.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option selected="selected" >--Chagua--</option>
                        {years?.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      <section className="content">

        <div className="container-fluid">
          <div className="row">
            <div className='col-sm-12 mb-3'>
              <h5 className='my-3'>Jedwali 1: Taarifa za watahiniwa waliosajiliwa na waliofanya upimaji wa darasa la pili kwa kila halmashauri</h5>
              <Table columns={columns} dataSource={data1} />
            </div>
          </div>
        </div>

        <h5 className='my-3'>Jedwali 2: Muhtasari wa Matokeo ya Upimaji Darasa la Pili Kimkoa</h5>
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Tabs
                type="card"
                defaultActiveKey="1"
                size={size}
                style={{
                  marginBottom: 32,
                }}
                items={[
                  {
                    label: 'Umahiri wa Kusoma',
                    key: '1',
                    children: (
                      <Table
                        columns={colsKusoma}
                        dataSource={schoolReport}
                      />
                    ),
                  },
                  {
                    label: 'Umahiri wa Kuandika',
                    key: '2',
                    children: (
                      <Table
                        columns={colsKuandika}
                        dataSource={schoolReport}
                      />
                    ),
                  },
                  {
                    label: 'Umahiri wa Kuhesabu',
                    key: '3',
                    children: (
                      <Table
                        columns={colskuhesabu}
                        dataSource={schoolReport}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div> */}
        {/* /.container-fluid */}

      </section>
    </>
  )
}
