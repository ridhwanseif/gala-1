import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { fetchAverage, fetchBoysPassed, fetchGirlsPassed, fetchRipotiYaMkoa } from '../../api/ripoti';
import { Space, Table, Tag, Tabs, Input, Button } from 'antd';
import { RipotiYaShuleChart } from '../../utils/Chart';
import { render } from 'rsuite/esm/internals/utils';
import axios from '../../api/axios';

export default function TaarifaYaMkoa() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [school, setSchool] = useState();
  const [schoolNo, setSchoolNo] = useState();
  // const [girlsPassed, setGirlsPassed] = useState([])
  // const [boysPassed, setBoysPassed] = useState([])
  // const [average, setAverage] = useState([])




  const { data: boysPassedData, isLoading: isLoadingBoysPassed, isError: isErrorBoysPassed } = useQuery(
    ['boysPassedData', month, year], fetchBoysPassed, { enable: !!month && !!year })

  console.log(JSON.stringify(boysPassedData, null, 2))
    
  // const { data: girlsPassedData, isLoading: isLoadingGirlsPassed, isError: isErrorGirlsPassed } = useQuery(
  //   ['girlsPassedData', month, year], fetchGirlsPassed, { enable: !!month && !!year }
  // )
  // const { data: averageData, isLoading: isLoadingAverage, isError: isErrorAverage } = useQuery(
  //   ['averageData', month, year], fetchAverage, { enable: !!month && !!year }
  // )

  const getValueByHalmashauri = (array, key) => {
    const { wastani } = array.find((obj) => obj.wilaya === key) || {};
    return wastani;
  };

  const getPassedStatsByHalmaShauri = (array, key) => {
    const { ufaulu } = array.find((obj) => obj.wilaya === key) || {};
    return ufaulu;
  };

  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);

  const { data: ripotiYaMkoa, isLoading: isLoadingSchoolReport, isError: isErrorSchoolReport } =
    useQuery(['ripotiYaMkoa', month, year], fetchRipotiYaMkoa, { enabled: !!year && !!month });
 

  // console.log(JSON.stringify(ripotiYaMkoa, null, 2))
  // console.log(JSON.stringify(wastaniReport, null, 2))


  const colMkoa = [
    {
      title: 'Na',
      dataIndex: 'na',
      key: 'na',
      // render:(index)=>index+1,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Halmashauri',
      dataIndex: 'council',
      key: 'council',
    },
    {
      title: 'Waliosajiliwa',
      children: [
        {
          title: 'WAV',
          dataIndex: 'boys',
          key: 'boys',
          // key: 'registeredWAV',

        },
        {
          title: 'WAS',
          dataIndex: 'girls',
          key: 'girls',
          // key: 'registeredWAS',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total',
          key: 'total',
          // key: 'registeredJUM',
        },
      ],
    },
    {
      title: 'Waliofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'present_boys',
          key: 'present_boys',
        },
        {
          title: 'WAS',
          dataIndex: 'present_girls',
          key: 'present_girls',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total_present',
          key: 'total_present',
        },
        {
          title: '%',
          dataIndex: 'total_present',
          key: 'total_present',
          render: (total_present, item) => {
            const percentage = ((total_present / item.total).toFixed(4) * 100).toFixed(2);
            return (
              <>{percentage}%</>
            );
          },
        },
      ],
    },
    {
      title: 'Wasiofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'absent_boys',
          key: 'notCompletedWAV',
        },
        {
          title: 'WAS',
          dataIndex: 'absent_girls',
          key: 'absent_girls',
          // key: 'notCompletedWAS',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total_absent',
          key: 'total_absent',
          // key: 'notCompletedJUM',
        },
        {
          title: '%',
          dataIndex: 'total_absent',
          key: 'notCompletedPercent',
          render: (total_absent, item) => {
            const percentage = ((total_absent / item.total).toFixed(4) * 100).toFixed(2)
            return (
              <>{percentage}%</>
            )
          }
        },
      ],
    },
  ];

  const colsKuandika = [
    {
      title: 'Na',
      dataIndex: 'na',
      key: 'na',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Halmashauri',
      dataIndex: 'council',
      key: 'council',
    },
    {
      title: 'Waliosajiliwa',
      children: [
        {
          title: 'WAV',
          dataIndex: 'boys',
          key: 'boys',

        },
        {
          title: 'WAS',
          dataIndex: 'girls',
          key: 'girls',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total',
          key: 'total',
        },
      ],
    },
    {
      title: 'Waliofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'present_boys',
          key: 'present_boys',
        },
        {
          title: 'WAS',
          dataIndex: 'present_girls',
          key: 'present_girls',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total_present',
          key: 'total_present',
        },
        {
          title: '%',
          dataIndex: 'total_present',
          key: 'completedPercent',
          render: (total_present, record) => {
            const percentage = ((total_present / record.total).toFixed(4) * 100).toFixed(2);
            // const percentage = ((item.total_present / item.total) * 100).toFixed(2);
            return (
              <>{percentage}%</>
            );
          },
        },
      ],
    },
    {
      title: 'Wasiofanya',
      children: [
        {
          title: 'WAV',
          dataIndex: 'absent_boys',
          key: 'notCompletedWAV',
        },
        {
          title: 'WAS',
          dataIndex: 'absent_girls',
          key: 'absent_girls',
        },
        {
          title: 'JUMLA',
          dataIndex: 'total_absent',
          key: 'total_absent',
        },
        {
          title: '%',
          dataIndex: 'total_absent',
          key: 'total_absent',
          render: (total_absent, item) => {
            const percentage = ((total_absent / item.total).toFixed(4) * 100).toFixed(2)
            return <>{percentage}%</>
          }
        },
      ],
    },
    {
      title: 'Waliofaulu Kkk',
      dataIndex: 'waliofaulu',
      key: 'waliofaulu',
      children: [
        {
          title: 'WAV',
          dataIndex: 'wavUfaulu',
          key: 'wavUfaulu',
          // render:(item)=>{
          //   const waliofaulu = getPassedStatsByHalmaShauri(boysPassedData,item.council)
          //   return <>{waliofaulu}</>
          // }
        }, {
          title: 'WAS',
          dataIndex: '',
          key: ''
        }, {
          title: 'JUMLA',
          dataIndex: '',
          key: ''
        }
      ]
    },
    {
      title: 'Wasiofaulu Kkk',
      dataIndex: 'wasiofaulu',
      key: 'wasiofaulu',
      children: [
        {
          title: 'WAV',
          dataIndex: '',
          key: ''
        }, {
          title: 'WAS',
          dataIndex: '',
          key: ''
        }, {
          title: 'JUMLA',
          dataIndex: '',
          key: ''
        }, {
          title: '%',
          dataIndex: 'percent',
          key: 'percent'
        }
      ]
    },
    {
      title: 'Wastani',
      dataIndex: '',
      key: '',

    }
  ];

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

  //   {
  //     title: 'S/N',
  //     dataIndex:"sn",
  //     key:'sn',
  //     width: '2%'
  //   },
  //   {
  //     title:'Halmashauri',
  //     dataIndex:'hal',
  //     key:'hal',
  //     width:'10%'
  //   },
  //   {
  //     title:'Waliosajiliw',
  //     dataIndex:'sajili',
  //     key:'sajili',
  //     width:'13%',
  //     children:[
  //       {
  //         title:'WAV',
  //         dataIndex:'wav',
  //         key:'wav',
  //         width:'3%'
  //       },
  //       {
  //         title:'WAS',
  //         dataIndex:'was',
  //         key:'was',
  //         width:'3%'
  //       },
  //       {
  //         title:'JUMLA',
  //         dataIndex:'jumla',
  //         key:'jumla',
  //         width:'6%'
  //       }
  //     ]
  //   },
  //   {
  //     title:'Waliofanya',
  //     dataIndex:'fanya',
  //     key:'fanya',
  //     width:'20%',
  //     children:[
  //       {
  //         title:'WAV',
  //         dataIndex:'wav',
  //         key:'wav',
  //         width:'3%'
  //       },
  //       {
  //         title:'WAS',
  //         dataIndex:'was',
  //         key:'was',
  //         width:'3%'
  //       },
  //       {
  //         title:'JUMLA',
  //         dataIndex:'jumla',
  //         key:'jumla',
  //         width:'7%'
  //       },
  //       {
  //         title:'%',
  //         dataIndex:'percent',
  //         key:'percent',
  //         width:'7%'
  //       }
  //     ]
  //   },
  //   {
  //     title:'Wasiofanya',
  //     dataIndex:'wasiofanya',
  //     key:'wasiofanya',
  //     width:'20%',
  //     children:[
  //       {
  //         title:'WAV',
  //         dataIndex:'wav',
  //         key:'wav',
  //         width:'3%'
  //       },
  //       {
  //         title:'WAS',
  //         dataIndex:'was',
  //         key:'was',
  //         width:'3%'
  //       },
  //       {
  //         title:'JUMLA',
  //         dataIndex:'jumla',
  //         key:'jumla',
  //         width:'7%'
  //       },
  //       {
  //         title:'%',
  //         dataIndex:'percent',
  //         key:'percent',
  //         width:'7%'
  //       }
  //     ]
  //   }
  //  ]

  // const colsKusoma = [
  //   {
  //     title: 'S/N',
  //     dataIndex: 'sn',
  //     key: 'sn',
  //     // ...getColumnSearchProps('sn'),
  //   },
  //   {
  //     title: 'Jina',
  //     dataIndex: 'jina',
  //     key: 'jina',
  //     width: '18%',
  //     ...getColumnSearchProps('jina'),
  //   },
  //   {
  //     title: 'Jisia',
  //     dataIndex: 'jisia',
  //     key: 'jisia',
  //     ...getColumnSearchProps('jisia'),
  //   },
  //   {
  //     title: 'Sauti za herufi	',
  //     dataIndex: 'sauti',
  //     key: 'sauti',
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu	',
  //     dataIndex: 'ufauluSauti',
  //     key: 'ufauluSauti',
  //   },
  //   {
  //     title: 'Maneno ya kubuni',
  //     dataIndex: 'kubuni',
  //     key: 'kubuni',
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufaulukubuni',
  //     key: 'ufaulukubuni',
  //   },
  //   {
  //     title: 'Kusoma Kwa Ufahamu',
  //     dataIndex: 'ufahamu',
  //     key: 'ufahamu',
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufauluUfahamu',
  //     key: 'ufauluUfahamu',
  //   },
  //   {
  //     title: 'Jumla',
  //     dataIndex: 'jumla',
  //     key: 'jumla',
  //     ...getColumnSearchProps('jumla'),
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  // ];

  // const colsKuandika = [
  //   {
  //     title: 'S/N',
  //     dataIndex: 'sn',
  //     key: 'sn',
  //     // ...getColumnSearchProps('sn'),
  //   },
  //   {
  //     title: 'Jina',
  //     dataIndex: 'jina',
  //     key: 'jina',
  //     width: '18%',
  //     ...getColumnSearchProps('jina'),
  //   },
  //   {
  //     title: 'Jisia',
  //     dataIndex: 'jisia',
  //     key: 'jisia',
  //     ...getColumnSearchProps('jisia'),
  //   },
  //   {
  //     title: 'Imla',
  //     dataIndex: 'sauti',
  //     key: 'sauti',
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufauluSauti',
  //     key: 'ufauluSauti',
  //   },
  //   {
  //     title: 'Ubora wa Imla',
  //     dataIndex: 'sauti',
  //     key: 'sauti',
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu	',
  //     dataIndex: 'ufauluSauti',
  //     key: 'ufauluSauti',
  //   },
  //   {
  //     title: 'Kupisijio Mistari Maeneo Yaliyochanganyika',
  //     dataIndex: 'sauti',
  //     key: 'sauti',
  //   },
  //   {
  //     title: 'Alama za uandishi',
  //     dataIndex: 'ufauluSauti',
  //     key: 'ufauluSauti',
  //   },
  //   {
  //     title: 'Ubora wa Ufuafu',
  //     dataIndex: 'sauti',
  //     key: 'sauti',
  //   },
  //   {
  //     title: 'Kutambua Majina Ya Vitu',
  //     dataIndex: 'ufauluSauti',
  //     key: 'ufauluSauti',
  //   },
  // ];

  // const colskuhesabu = [
  //   {
  //     title: 'S/N',
  //     dataIndex: 'sn',
  //     key: 'sn',
  //     // ...getColumnSearchProps('sn'),
  //   },
  //   {
  //     title: 'Jina',
  //     dataIndex: 'jina',
  //     key: 'jina',
  //     width: '18%',
  //     ...getColumnSearchProps('jina'),
  //   },
  //   {
  //     title: 'Jisia',
  //     dataIndex: 'jisia',
  //     key: 'jisia',
  //     ...getColumnSearchProps('jisia'),
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  //   {
  //     title: 'Jumla',
  //     dataIndex: 'jumla',
  //     key: 'jumla',
  //     ...getColumnSearchProps('jumla'),
  //   },
  //   {
  //     title: 'Utambuzi wa Namba',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  //   {
  //     title: 'Ubora wa Ufaulu',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  //   {
  //     title: 'Kujumulisha na kutoa',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  //   {
  //     title: 'Ubora wa Ufuafu',
  //     dataIndex: 'ufauluJumla',
  //     key: 'ufauluJumla',
  //     ...getColumnSearchProps('ufauluJumla'),
  //   },
  // ];

  return (
    <>
      {/* {/ Content Header (Page header) /} */}
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
      {/* {/ /.content-header /} */}

      <section className="content"
        // style={{
        //   overflow: "auto",
        //   scrollBehavior: "smooth",
        //   height: 580
        // }}
        >

        {/* <div className="container-fluid">
          <div className="row">
            <div className='col-sm-12 mb-3'>
              <h5 className='my-3'>Jedwali 1: Taarifa za watahiniwa waliosajiliwa na waliofanya upimaji wa darasa la pili kwa kila halmashauri</h5>
              <Table
                className='custom-table'
                columns={columns}
                dataSource={data1} />
            </div>
          </div>
        </div> */}

        <h5 className='my-3'>Jedwali 2: Muhtasari wa Matokeo ya Upimaji Darasa la Pili Kimkoa</h5>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Table
                className='custom-table'
                columns={colMkoa}
                dataSource={ripotiYaMkoa}
                scroll={{
                  x: 3000,
                }} />
            </div>
          </div>

          <h5 className='my-3'>Jedwali 2: Muhtasari wa Matokeo ya Upimaji Darasa la Pili Kimkoa</h5>
          <div className="row">
            <div className="col-12">
              <Table
                className='custom-table'
                columns={colsKuandika}
                dataSource={ripotiYaMkoa}
                scroll={{
                  x: 3000,
                }} />
            </div>
          </div>
        </div> 

        {/* <h5 className='my-3'>Jedwali 2: Muhtasari wa Matokeo ya Upimaji Darasa la Pili Kimkoa</h5>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Table
                className='custom-table'
                columns={colsKuandika}
                dataSource={ripotiYaMkoa}
                scroll={{
                  x: 3000,
                }} />
            </div>
          </div>
        </div> */}

      </section>
    </>
  )
}
