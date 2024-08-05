import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCouncil, fetchMonth, fetchWard, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { fetchReportHalimashauri } from '../../api/ripoti';
import { Space, Table, Input, Button, Select, Alert, Spin } from 'antd';
import { boyCount, dhaifuCount, getComment, girlCount, hajuiCount, vizuriCount, vizuriSanaCount, wastaniCount } from './ReportFunctions';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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
  const {
    data: councilReport,
    isLoading: isLoadingCouncilReport,
    isError: isErrorCouncilReport,
    error: fetchError, } =
    useQuery(['councilReport', year, ward, schoolNo, gender, month, council], fetchReportHalimashauri, { enabled: !!year && !!month });

  const { data: wards, isLoading: isLoadingWards, isError: isErrorWards } =
    useQuery(['wards', council], fetchWard, { enabled: !!council });

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

  const data1 = [
    {
      key: '1',
      wav: boyCount(transformedData),
      was: girlCount(transformedData),
      jum: boyCount(transformedData) + girlCount(transformedData),
      viz: vizuriSanaCount(transformedData),
      wast: vizuriCount(transformedData),
      haf: wastaniCount(transformedData),
      hafs: dhaifuCount(transformedData),
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

  const handleActionClick = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Define the table headers and data
    const tableHeaders = columns1.map(col => col.title);
    const tableData = data1.map(row => columns1.map(col => row[col.dataIndex]));

    // Add the table to the PDF
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    // Define the table headers and data for the second table
    const table2Headers = colsHalmashauri.map(col => col.title);
    const table2Data = councilReport?.map(row => colsHalmashauri.map(col => row[col.dataIndex]));

    // Add the second table to the PDF
    doc.autoTable({
      head: [table2Headers],
      body: table2Data,
      startY: doc.autoTable.previous.finalY + 10, // Starting position for the second table
      styles: { fontSize: 5, cellPadding: 1 },
      // tableWidth: 190,
    });

    // Save the PDF
    doc.save('Ripoti_ya_Halmashauri_ya_' + council + '.pdf');
  };


  const handleChangeSchool = (value) => {
    const selectedSchool = schools.find(y => y.school_reg_number === value);
    setSchoolNo(value);
    setSchool(selectedSchool ? selectedSchool.school_name : '');
  };

  const handleChangeWord = (value) => {
    setWard(value);
  };

  const handleChangeCouncil = (value) => {
    setCouncil(value);
  };

  const handleChangeGender = (value) => {
    setGender(value);
  };

  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h5>Ripoti ya Halmashauri</h5>
            </div>
            <div class="col-sm-6">
              <div className='row'>
                <div className='col-sm-12'>
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Nyumbani</a></li>
                    <li class="breadcrumb-item active">RipotiYaHalmashauri</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Chagua Halmashauri</label><br />
                {isLoadingCouncil ? (
                  <p>Loading...</p>
                ) : isErrorCouncil ? (
                  <p>Error loading Halmashauri.</p>
                ) : (

                  <Select
                    defaultValue="Chagua halmashauri"
                    style={{ width: 170 }}
                    onChange={handleChangeCouncil}
                    placeholder="--Chagua--"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {councils?.map((c) => (
                      <Option key={c.id} value={c}>
                        {c}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>

            </div>
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Chagua kata</label><br />
                {isLoadingWards ? (
                  <p>Loading...</p>
                ) : isErrorMonth ? (
                  <p>Error loading Kata.</p>
                ) : (

                  <Select
                    defaultValue="Chagua kata"
                    style={{ width: 170 }}
                    onChange={handleChangeWord}
                    placeholder="--Chagua--"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {wards?.map((w) => (
                      <Option key={w} value={w}>
                        {w}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Chagua Shule</label><br />
                {isLoadingYear ? (
                  <p>Loading...</p>
                ) : isErrorYear ? (
                  <p>Error loading Shule.</p>
                ) : (
                  <Select
                    defaultValue="Chagua Shule"
                    style={{ width: 200 }}
                    onChange={handleChangeSchool}
                    placeholder="--Chagua--"
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {schools?.map((s) => (
                      <Option key={s.id} value={s.school_reg_number}>
                        {s.school_name}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Jinsia</label><br />
                <Select
                  defaultValue="Chagua mwezi"
                  style={{ width: 170 }}
                  onChange={handleChangeGender}
                  options={[
                    {
                      value: 'Mvulana',
                      label: 'Mvulana',
                    },
                    {
                      value: 'Msichana',
                      label: 'Msichana',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="col-sm-4 float-right">
              <div className="form-group">
                <label>Mwezi</label><br />
                {isLoadingMonth ? (
                  <p>Loading...</p>
                ) : isErrorMonth ? (
                  <p>Error loading months.</p>
                ) : (
                  <Select
                    defaultValue="Chagua mwezi"
                    style={{ width: 170 }}
                    onChange={setMonth} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {months?.map((m) => (
                      <Option key={m} value={m}>{m}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="col-sm-2 float-right">
              <div className="form-group">
                <label>Mwaka</label><br />
                {isLoadingYear ? (
                  <p>Loading...</p>
                ) : isErrorYear ? (
                  <p>Error loading years.</p>
                ) : (
                  <Select
                    defaultValue="Chagua mwaka"
                    style={{ width: 170 }}
                    onChange={setYear} // no need to wrap it with (e) => setYear(e.target.value)
                  >
                    {years?.map((y) => (
                      <Option key={y} value={y}>{y}</Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='row my-4'>
          <div className='col-10'>
            <h5 className='text-center'>
              Ripoti ya Halmashauri ya {council}
            </h5>
          </div>
          <div className='col-2'>
            <Button type="primary" onClick={() => handleActionClick()}>Chapisha PDF </Button>
          </div>
          <hr />
        </div>
      </div>
      {/* /.content-header */}
      <section className="content">
        {fetchError && (
          <Alert className='flex-center' message="Error" description={fetchError.message} type="error" showIcon />
        )
        }
        <Spin spinning={isLoadingCouncilReport} tip="Loading...">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 mb-3">
                <h5>Ujumla ya Wanafunzi</h5>
                <Table
                  className="custom-table"
                  columns={columns1}
                  dataSource={data1}
                  pagination={false}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Table
                  className="custom-table"
                  columns={colsHalmashauri}
                  dataSource={councilReport}
                  scroll={{ x: 2650 }}
                />
              </div>
            </div>
          </div>
        </Spin>
      </section>

    </>
  )
}
