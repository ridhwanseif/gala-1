import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCouncil, fetchMonth, fetchWard, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { fetchReportHalimashauri, fetchRipotiYaShule } from '../../api/ripoti';
import { Space, Table, Input, Button, Select } from 'antd';
import { RipotiYaShuleChart } from '../../utils/Chart';
import { boyCount, dhaifuCount, getComment, girlCount, hajuiCount, vizuriCount, vizuriSanaCount, wastaniCount } from './ReportFunctions';

export default function RipotiYaShule() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [school, setSchool] = useState();
  const [schoolNo, setSchoolNo] = useState();
  const [council, setCouncil] = useState();
  const [ward, setWard] = useState();
  const [gender, setGender] = useState();


  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: schools, isLoading: isLoadingSchool, isError: isErrorSchool } = useQuery('schools', fetchMwatwaraSchools);
  const { data: councils, isLoading: isLoadingCouncil, isError: isErrorCouncil } = useQuery('councils', fetchCouncil);
  const { data: councilReport, isLoading: isLoadingCouncilReport, isError: isErrorCouncilReport } =
    useQuery(['councilReport', year, ward, schoolNo, gender, month, council], fetchReportHalimashauri, { enabled: !!year && !!month });

  const { data: wards, isLoading: isLoadingWards, isError: isErrorWards } =
    useQuery(['wards', council], fetchWard, { enabled: !!council });


  // console.log(councilReport)
  // console.log(JSON.stringify(councilReport, null, 2))

  const columns1 = [
    {
      title: 'Wavulana',
      dataIndex: 'wav',
      key: 'wav',
    },
    {
      title: 'Wasichana',
      dataIndex: 'was',
      key: 'was',
    },
    {
      title: 'Jumla',
      dataIndex: 'jum',
      key: 'jum',
    },

    {
      title: 'Vizuri sana (VS)',
      dataIndex: 'viz',
      key: 'viz',
    },
    {
      title: 'Vizuri(VZ)',
      dataIndex: 'wast',
      key: 'wast',
    },
    {
      title: 'Wastani(WS)',
      dataIndex: 'haf',
      key: 'haf',
    },
    {
      title: 'Hafifu(H)',
      dataIndex: 'hafz',
      key: 'hafz',
    },
    {
      title: 'Hafifu Zaidi(HZ)',
      dataIndex: 'hafz',
      key: 'hafz',
    },
  ];

  const transformedData = councilReport ? councilReport.map(report => ({
    id: report.id,
    mkoa: report.mkoa,
    wilaya: report.wilaya,
    kata: report.kata,
    shule: report.shule,
    shuleNo: report.shuleNo,
    jina: report.jina,
    usajiliNo: report.usajiliNo,
    jinsia: report.jinsia,
    mwezi: report.mwezi,
    mwaka: report.mwaka,
    kku: report.kku,
    myk: report.myk,
    szh: report.szh,
    imla: report.imla,
    uaf: report.uaf,
    picha: report.picha,
    hzm: report.hzm,
    uta: report.uta,
    maf: report.maf,
    jum1: report.jum1,
    jum2: report.jum2,
    kut1: report.kut1,
    kut2: report.kut2,
    nz: report.nz,
    kusT: report.kusT,
    kuaT: report.kuaT,
    hesT: report.hesT,
    jumla: report.jumla
  })) : [];


  const data1 = [
    {
      key: '1',
      wav: boyCount(transformedData),
      was: girlCount(transformedData),
      jum: boyCount(transformedData) + girlCount(transformedData),
      viz: vizuriSanaCount(transformedData),
      wast: vizuriCount(transformedData),
      haf: wastaniCount(transformedData),
      hafz: dhaifuCount(transformedData),
      hafz: hajuiCount(transformedData),
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


  const colsHalmashauri = [
    {
      title: 'No/Usajili',
      dataIndex: 'shuleNo',
      width: '.8%',
      key: 'shuleNo',
      // ...getColumnSearchProps('sn'),
      fixed: 'left',
    },
    {
      title: 'Jina la shule',
      dataIndex: 'shule',
      key: 'shule',
      width: '1.3%',
      ...getColumnSearchProps('shule'),
      fixed: 'left',
      // sorter: true,
    },
    {
      title: 'Jina la Mwanafunzi',
      dataIndex: 'jina',
      width: '2%',
      key: 'jina',
      fixed: 'left',
      // ...getColumnSearchProps('jisia'),
    },
    {
      title: 'Jinsia',
      dataIndex: 'jinsia',
      width: '.8%',
      key: 'jinsia',
      fixed: 'left',
    },
    {
      title: 'Sauti za herufi',
      dataIndex: 'szh',
      width: '.7%',
      key: 'szh',
    },
    {
      title: 'Maneno ya kubuni',
      dataIndex: 'myk',
      width: '.8%',
      key: 'myk',
    },
    {
      title: 'Kusoma Kwa Ufahamu',
      dataIndex: 'kku',
      width: '.8%',
      key: 'kku',
    },
    {
      title: 'Jumla (Kusoma)',
      dataIndex: 'kusT',
      width: '.9%',
      key: 'kusT',
    },
    {
      title: 'Imla',
      dataIndex: 'imla',
      width: '.9%',
      key: 'imla',
    },
    {
      title: 'Kupigia Mistari Maneno Yaliyochanganyiwa',
      dataIndex: 'hzm',
      width: '1%',
      key: 'hzm',
    },
    {
      title: 'Alama za uandishi',
      dataIndex: 'jumla',
      width: '.8%',
      key: 'jumla',
      // ...getColumnSearchProps('jumla'),
    },
    {
      title: 'Kutambua vitu',
      dataIndex: 'picha',
      width: '.9%',
      key: 'picha',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Jumla (Kuandika)',
      dataIndex: 'kuaT',
      width: '.9%',
      key: 'kuaT',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Utambuzi wa nambari',
      dataIndex: 'uta',
      width: '1%',
      key: 'uta',
      // ...getColumnSearchProps('jumla'),
    },
    {
      title: 'Kujumlisha ngazi ya I',
      dataIndex: 'jum1',
      width: '1%',
      key: 'jum1',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Kujumlisha ngazi ya II',
      dataIndex: 'jum2',
      width: '1%',
      key: 'jum2',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Kutoa ngazi ya I',
      dataIndex: 'kut1',
      width: '1%',
      key: 'kut1',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Kutoa ngazi ya II',
      dataIndex: 'kut2',
      width: '1%',
      key: 'kut2',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Nambari Inayokosekana',
      dataIndex: 'nz',
      width: '1%',
      key: 'nz',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Mafumbo',
      dataIndex: 'maf',
      width: '1%',
      key: 'maf',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Jumla (Hesabu)',
      dataIndex: 'hesT',
      width: '1%',
      key: 'hesT',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Jumla Kuu',
      dataIndex: 'jumla',
      width: '1%',
      key: 'jumla',
      // ...getColumnSearchProps('ufauluJumla'),
    },
    {
      title: 'Maoni',
      dataIndex: 'jumla',
      width: '1%',
      key: 'jumla',
      render: (total) => {
        const jumla = getComment(total);
        return (
          <>{jumla}</>
        );
      },
      // ...getColumnSearchProps('ufauluJumla'),
    },
  ];


  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h4>Ripoti ya Halmashauri</h4>
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
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Chagua Halmashauri</label>
                {isLoadingCouncil ? (
                  <p>Loading...</p>
                ) : isErrorCouncil ? (
                  <p>Error loading Halmashauri.</p>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setCouncil(e.target.value)
                    }}
                  >
                    <option selected="selected" >--Chagua--</option>
                    {councils?.map((y) => (
                      <option key={y.id} value={y}>{y}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Chagua kata</label>
                {isLoadingWards ? (
                  <p>Loading...</p>
                ) : isErrorMonth ? (
                  <p>Error loading Kata.</p>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setWard(e.target.value)}
                  >
                    <option selected="selected" >--Chagua--</option>
                    {wards?.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Chagua Shule</label>
                {isLoadingYear ? (
                  <p>Loading...</p>
                ) : isErrorYear ? (
                  <p>Error loading Shule.</p>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSchool(e.target.value)
                      setSchoolNo(e.target.value)
                    }
                    }
                  >
                    <option selected="selected" >--Chagua--</option>
                    {schools?.map((s) => (
                      <option key={s.id} value={s.school_reg_number}>{s.school_name}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Jinsia</label>
                <select
                  className="form-control"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" selected="selected">--Chagua--</option>
                  <option value="Mvulana">Mvulana</option>
                  <option value="Msichana">Msichana</option>
                </select>
              </div>
            </div>
            <div className="col-sm-2 float-right">
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
            <div className="col-sm-2 float-right">
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
      {/* /.content-header */}

      <section className="content">

        {isLoadingCouncilReport && <p>Loading...</p>}
        {isErrorCouncilReport && <p>Error loading months.</p>}
        {!isLoadingCouncilReport && !isErrorCouncilReport && (
          <>
            <div className="container-fluid">
              <div className="row">
                <div className='col-sm-12 mb-3'>
                  <h4>Ujumla ya Wanafunzi</h4>
                  <Table className='custom-table'
                    columns={columns1}
                    dataSource={data1}
                    pagination={false} />

                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  {isLoadingCouncilReport && <p></p>}
                  {isErrorCouncilReport && <p>Error loading months.</p>}
                  {!isLoadingCouncilReport && !isErrorCouncilReport && (
                    <Table
                      className='custom-table'
                      columns={colsHalmashauri}
                      dataSource={councilReport}
                      scroll={{
                        x: 2650,
                      }}
                    />
                  )}
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}

          </>
        )}

      </section>




    </>
  )
}
