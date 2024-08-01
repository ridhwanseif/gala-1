import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';
import { fetchMonth, fetchYear } from '../../api/upimajiFilterAPI';
import { fetchMwatwaraSchools } from '../../api/mtwaraSchooleAPI';
import { fetchRipotiYaShule } from '../../api/ripoti';
import { Space, Table, Tag, Tabs, Input, Button } from 'antd';
import { azuPassCount, boyCount, dhaifuCount, getComment, getComment100, getComment12, getComment16, getComment20, getComment24, getComment40, getComment8, girlCount, hajuiCount, imlaAverage, imlaPassCount, jum1Average, jum1PassCount, jum2Average, jum2PassCount, kkuAverage, kkuPassCount, kut1Average, kut1PassCount, kut2Average, kut2PassCount, mafAverage, mafPassCount, mykAverage, mykPassCount, ndogoAverage, ndogoPassCount, nzAverage, nzPassCount, progressTowardsThreshold, szhAverage, szhPassCount, uanAverage, utaAverage, utaPassCount, vituAverage, vituPassCount, vizuriCount, vizuriSanaCount, wastaniCount } from './ReportFunctions';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function RipotiYaShule() {

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [school, setSchool] = useState();
  const [schoolNo, setSchoolNo] = useState();
  const [data, setData] = useState([]);

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


  // Fetch setSchool
  const { data: years, isLoading: isLoadingYear, isError: isErrorYear } = useQuery('years', fetchYear);
  const { data: months, isLoading: isLoadingMonth, isError: isErrorMonth } = useQuery('months', fetchMonth);
  const { data: schools, isLoading: isLoadingSchool, isError: isErrorSchool } = useQuery('schools', fetchMwatwaraSchools);

  const { data: schoolReport, isLoading: isLoadingSchoolReport, isError: isErrorSchoolReport } =
    useQuery(['schoolReport', month, year, schoolNo], fetchRipotiYaShule);

  const transformedData = schoolReport ? schoolReport.map(report => ({
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



  const dataSource = [
    {
      area: 'Umahiri wa Kusoma'
    },
    {
      key: '1',
      area: 'Sauti za Herufi',
      description: 'Wanafunzi walioeza kutaja sauti za herufi',
      vizuriSanaWav: szhPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: szhPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: szhPassCount(transformedData, "Mvulana", "VS") + szhPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: szhPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: szhPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: szhPassCount(transformedData, "Mvulana", "VZ") + szhPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: szhPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: szhPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: szhPassCount(transformedData, "Mvulana", "WS") + szhPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: szhPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: szhPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: szhPassCount(transformedData, "Mvulana", "DH") + szhPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: szhPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: szhPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: szhPassCount(transformedData, "Mvulana", "HJ") + szhPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '2',
      area: 'Maneno ya kubuni',
      description: 'Wanafunzi walioeza kusoma maneno ya kubuni',
      vizuriSanaWav: mykPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: mykPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: mykPassCount(transformedData, "Mvulana", "VS") + mykPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: mykPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: mykPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: mykPassCount(transformedData, "Mvulana", "VZ") + mykPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: mykPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: mykPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: mykPassCount(transformedData, "Mvulana", "WS") + mykPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: mykPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: mykPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: mykPassCount(transformedData, "Mvulana", "DH") + mykPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: mykPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: mykPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: mykPassCount(transformedData, "Mvulana", "HJ") + mykPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '3',
      area: 'Kusoma kwa ufahamu',
      description: 'Wanafunzi walioeza kujibu kwa usahihi yanayotokana na kusoma kwa ufahamu',
      vizuriSanaWav: kkuPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: kkuPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: kkuPassCount(transformedData, "Mvulana", "VS") + kkuPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: kkuPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: kkuPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: kkuPassCount(transformedData, "Mvulana", "VZ") + kkuPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: kkuPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: kkuPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: kkuPassCount(transformedData, "Mvulana", "WS") + kkuPassCount(transformedData, "Msichana", "WS"),
      dhaifuWav: kkuPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: kkuPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: kkuPassCount(transformedData, "Mvulana", "DH") + kkuPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: kkuPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: kkuPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: kkuPassCount(transformedData, "Mvulana", "HJ") + kkuPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      area: 'Umahiri wa Kuandika'
    },
    {
      key: '1',
      area: 'Imla',
      description: 'Wanafunzi walioweza kuandika kwa usahihi kwenye sentensi za Imla',
      vizuriSanaWav: imlaPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: imlaPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: imlaPassCount(transformedData, "Mvulana", "VS") + imlaPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: imlaPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: imlaPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: imlaPassCount(transformedData, "Mvulana", "VZ") + imlaPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: imlaPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: imlaPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: imlaPassCount(transformedData, "Mvulana", "WS") + imlaPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: imlaPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: imlaPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: imlaPassCount(transformedData, "Mvulana", "DH") + imlaPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: imlaPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: imlaPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: imlaPassCount(transformedData, "Mvulana", "HJ") + imlaPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '2',
      area: 'Kupigia mstari maneno yaliyoandikwa',
      description: 'Wwanafunzi walioweza kupigia mstari maneno yenye herufi kubwa au ndogo',
      vizuriSanaWav: ndogoPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: ndogoPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: ndogoPassCount(transformedData, "Mvulana", "VS") + ndogoPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: ndogoPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: ndogoPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: ndogoPassCount(transformedData, "Mvulana", "VZ") + ndogoPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: ndogoPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: ndogoPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: ndogoPassCount(transformedData, "Mvulana", "WS") + ndogoPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: ndogoPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: ndogoPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: ndogoPassCount(transformedData, "Mvulana", "DH") + ndogoPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: ndogoPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: ndogoPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: ndogoPassCount(transformedData, "Mvulana", "HJ") + ndogoPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '3',
      area: 'Alama za Uandishi',
      description: 'Wanafunzi walioweza kuweka kwa usahihi alama za uandishi',
      vizuriSanaWav: azuPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: azuPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: azuPassCount(transformedData, "Mvulana", "VS") + azuPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: azuPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: azuPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: azuPassCount(transformedData, "Mvulana", "VZ") + azuPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: azuPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: azuPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: azuPassCount(transformedData, "Mvulana", "WS") + azuPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: azuPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: azuPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: azuPassCount(transformedData, "Mvulana", "DH") + azuPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: azuPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: azuPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: azuPassCount(transformedData, "Mvulana", "HJ") + azuPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '4',
      area: 'Kutambua majina ya vitu',
      description: 'wanafunzi walioweza kuandika majina ya vitu kwa usahihi',
      vizuriSanaWav: vituPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: vituPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: vituPassCount(transformedData, "Mvulana", "VS") + vituPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: vituPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: vituPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: vituPassCount(transformedData, "Mvulana", "VZ") + vituPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: vituPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: vituPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: vituPassCount(transformedData, "Mvulana", "WS") + vituPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: vituPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: vituPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: vituPassCount(transformedData, "Mvulana", "DH") + vituPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: vituPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: vituPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: vituPassCount(transformedData, "Mvulana", "HJ") + vituPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      area: 'Umahiri wa Kuhesabu'
    },
    {
      key: '1',
      area: 'Utambuzi wa namba',
      description: 'Wanafunzi walioweza kutambua namba kwa usahihi',
      vizuriSanaWav: utaPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: utaPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: utaPassCount(transformedData, "Mvulana", "VS") + utaPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: utaPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: utaPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: utaPassCount(transformedData, "Mvulana", "VZ") + utaPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: utaPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: utaPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: utaPassCount(transformedData, "Mvulana", "WS") + utaPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: utaPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: utaPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: utaPassCount(transformedData, "Mvulana", "DH") + utaPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: utaPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: utaPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: utaPassCount(transformedData, "Mvulana", "HJ") + utaPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '2',
      area: 'Namba Inayokosekana',
      description: 'Wanafunzi walioweza kujaza namba zinazokosekana kwa usahihi',
      vizuriSanaWav: nzPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: nzPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: nzPassCount(transformedData, "Mvulana", "VS") + nzPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: nzPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: utaPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: nzPassCount(transformedData, "Mvulana", "VZ") + nzPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: nzPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: utaPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: nzPassCount(transformedData, "Mvulana", "WS") + nzPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: nzPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: nzPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: nzPassCount(transformedData, "Mvulana", "DH") + nzPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: nzPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: utaPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: nzPassCount(transformedData, "Mvulana", "HJ") + nzPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '3',
      area: 'Mafumbo',
      description: 'Wanafunzi walioweza kufumbua mafumbo kwa usahihi',
      vizuriSanaWav: mafPassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: mafPassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: mafPassCount(transformedData, "Mvulana", "VS") + mafPassCount(transformedData, "Msichana", "VS"),
      vizuriWav: mafPassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: mafPassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: mafPassCount(transformedData, "Mvulana", "VZ") + mafPassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: mafPassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: mafPassCount(transformedData, "Msichana", "WS"),
      wastaniJum: mafPassCount(transformedData, "Mvulana", "WS") + mafPassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: mafPassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: mafPassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: mafPassCount(transformedData, "Mvulana", "DH") + mafPassCount(transformedData, "Msichana", "DH"),
      hajuiWav: utaPassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: mafPassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: mafPassCount(transformedData, "Mvulana", "HJ") + mafPassCount(transformedData, "Msichana", "HJ"),
    },
    {
      area: '4. Matendo katika namba'
    },
    {
      key: '4(a)',
      area: 'Kujumlisha Ngazi ya I',
      description: 'Wanafunzi walioweza Kujumlisha namba ngazi ya I kwa usahihi',
      vizuriSanaWav: jum1PassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: jum1PassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: jum1PassCount(transformedData, "Mvulana", "VS") + jum1PassCount(transformedData, "Msichana", "VS"),
      vizuriWav: jum1PassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: jum1PassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: jum1PassCount(transformedData, "Mvulana", "VZ") + jum1PassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: jum1PassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: jum1PassCount(transformedData, "Msichana", "WS"),
      wastaniJum: jum1PassCount(transformedData, "Mvulana", "WS") + jum1PassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: jum1PassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: jum1PassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: jum1PassCount(transformedData, "Mvulana", "DH") + jum1PassCount(transformedData, "Msichana", "DH"),
      hajuiWav: jum1PassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: jum1PassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: jum1PassCount(transformedData, "Mvulana", "HJ") + jum1PassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '4(b)',
      area: 'Kujumlisha Ngazi ya II',
      description: 'Wanafunzi walioweza Kujumlisha namba ngazi ya II kwa usahihi',
      vizuriSanaWav: jum2PassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: jum2PassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: jum2PassCount(transformedData, "Mvulana", "VS") + jum2PassCount(transformedData, "Msichana", "VS"),
      vizuriWav: jum2PassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: jum2PassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: jum2PassCount(transformedData, "Mvulana", "VZ") + jum2PassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: jum2PassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: jum2PassCount(transformedData, "Msichana", "WS"),
      wastaniJum: jum2PassCount(transformedData, "Mvulana", "WS") + jum2PassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: jum2PassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: jum2PassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: jum2PassCount(transformedData, "Mvulana", "DH") + jum2PassCount(transformedData, "Msichana", "DH"),
      hajuiWav: jum2PassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: jum2PassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: jum2PassCount(transformedData, "Mvulana", "HJ") + jum2PassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '4(c)',
      area: 'Kutoa Ngazi ya I',
      description: 'Wanafunzi walioweza Kutoa namba ngazi ya I kwa usahihi',
      vizuriSanaWav: kut1PassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: kut1PassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: kut1PassCount(transformedData, "Mvulana", "VS") + kut1PassCount(transformedData, "Msichana", "VS"),
      vizuriWav: kut1PassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: kut1PassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: kut1PassCount(transformedData, "Mvulana", "VZ") + kut1PassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: kut1PassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: kut1PassCount(transformedData, "Msichana", "WS"),
      wastaniJum: kut1PassCount(transformedData, "Mvulana", "WS") + kut1PassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: kut1PassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: kut1PassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: kut1PassCount(transformedData, "Mvulana", "DH") + kut1PassCount(transformedData, "Msichana", "DH"),
      hajuiWav: kut1PassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: kut1PassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: kut1PassCount(transformedData, "Mvulana", "HJ") + kut1PassCount(transformedData, "Msichana", "HJ"),
    },
    {
      key: '4(d)',
      area: 'Kutoa Ngazi ya II',
      description: 'Wanafunzi walioweza Kutoa namba ngazi ya II kwa usahihi',
      vizuriSanaWav: kut2PassCount(transformedData, "Mvulana", "VS"),
      vizuriSanaWas: kut2PassCount(transformedData, "Msichana", "VS"),
      vizuriSanaJum: kut2PassCount(transformedData, "Mvulana", "VS") + kut2PassCount(transformedData, "Msichana", "VS"),
      vizuriWav: kut2PassCount(transformedData, "Mvulana", "VZ"),
      vizuriWas: kut2PassCount(transformedData, "Msichana", "VZ"),
      vizuriJum: kut2PassCount(transformedData, "Mvulana", "VZ") + kut2PassCount(transformedData, "Msichana", "VZ"),
      wastaniWav: kut2PassCount(transformedData, "Mvulana", "WS"),
      wastaniWas: kut2PassCount(transformedData, "Msichana", "WS"),
      wastaniJum: kut2PassCount(transformedData, "Mvulana", "WS") + kut2PassCount(transformedData, "Msichana", "Wastani/Inarishisha"),
      dhaifuWav: kut2PassCount(transformedData, "Mvulana", "DH"),
      dhaifuWas: kut2PassCount(transformedData, "Msichana", "DH"),
      dhaifuJum: kut2PassCount(transformedData, "Mvulana", "DH") + kut2PassCount(transformedData, "Msichana", "DH"),
      hajuiWav: kut2PassCount(transformedData, "Mvulana", "HJ"),
      hajuiWas: kut2PassCount(transformedData, "Msichana", "HJ"),
      hajuiJum: kut2PassCount(transformedData, "Mvulana", "HJ") + kut2PassCount(transformedData, "Msichana", "HJ"),
    },
  ];

  const columnsa = [
    {
      title: 'sn',
      dataIndex: 'key',
      key: 'key',

    },
    {
      title: 'Eneo Linalopimwa',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Kiwango cha Ufanisi/ Ufaulu',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ufaulu',
      children: [
        {
          title: 'Vizuri Sana',
          children: [
            {
              title: 'Wav',
              dataIndex: 'vizuriSanaWav', key: 'vizuriSanaWav'
            },
            { title: 'Was', dataIndex: 'vizuriSanaWas', key: 'vizuriSanaWas' },
            { title: 'Jum', dataIndex: 'vizuriSanaJum', key: 'vizuriSanaJum' },
          ],
        },
        {
          title: 'Vizuri',
          children: [
            { title: 'Wav', dataIndex: 'vizuriWav', key: 'vizuriWav' },
            { title: 'Was', dataIndex: 'vizuriWas', key: 'vizuriWas' },
            { title: 'Jum', dataIndex: 'vizuriJum', key: 'vizuriJum' },
          ],
        },
        {
          title: 'Wastani',
          children: [
            { title: 'Wav', dataIndex: 'wastaniWav', key: 'wastaniWav' },
            { title: 'Was', dataIndex: 'wastaniWas', key: 'wastaniWas' },
            { title: 'Jum', dataIndex: 'wastaniJum', key: 'wastaniJum' },
          ],
        },
        {
          title: 'Dhaifu',
          children: [
            { title: 'Wav', dataIndex: 'dhaifuWav', key: 'dhaifuWav' },
            { title: 'Was', dataIndex: 'dhaifuWas', key: 'dhaifuWas' },
            { title: 'Jum', dataIndex: 'dhaifuJum', key: 'dhaifuJum' },
          ],
        },
        {
          title: 'Hajui',
          children: [
            { title: 'Wav', dataIndex: 'hajuiWav', key: 'hajuiWav' },
            { title: 'Was', dataIndex: 'hajuiWas', key: 'hajuiWas' },
            { title: 'Jum', dataIndex: 'hajuiJum', key: 'hajuiJum' },
          ],
        },
      ],
    },
  ];

  // sumary report table
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
      title: 'Vizuri Sana (VS)',
      dataIndex: 'vizs',
      key: 'vizs',
    },
    {
      title: 'Vizuri (VZ)',
      dataIndex: 'viz',
      key: 'viz',
    },
    {
      title: 'Wastani (WS)',
      dataIndex: 'wast',
      key: 'wast',
    },
    {
      title: 'Hafifu (H)',
      dataIndex: 'haf',
      key: 'haf',
    },
    {
      title: 'Hafifu Zaidi (HZ)',
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
      vizs: vizuriSanaCount(transformedData),
      viz: vizuriCount(transformedData),
      wast: wastaniCount(transformedData),
      haf: dhaifuCount(transformedData),
      hafz: hajuiCount(transformedData),
    },
  ]


  const columns = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
      fixed: 'left',
      width: '2.3%',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Jina La Mwanafunzi',
      dataIndex: 'jina',
      key: 'jina',
      fixed: 'left',
      width: '12%',
      ...getColumnSearchProps('jina'),

    },
    {
      title: 'Jinsia',
      dataIndex: 'jinsia',
      key: 'jinsia',
      fixed: 'left',
      // sorter: true,
      width: '4%',
    },
    {
      title: 'Umahiri wa Kusoma	',
      fixed: 'left',
      children: [
        {
          title: 'Sauti za herufi',
          dataIndex: 'szh',
          key: 'szh',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'szh',
          key: 'szhv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment40(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Maneno ya kubuni',
          dataIndex: 'myk',
          key: 'myk',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'myk',
          key: 'mykv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment40(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kusoma Kwa Ufahamu',
          dataIndex: 'kku',
          key: 'kku',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'kku',
          key: 'kkuv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment20(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Jumla',
          dataIndex: 'kusT',
          key: 'kusT',
          width: '3%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'kusT',
          key: 'kusTv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment100(marks);
            return (
              <>{percentage}</>
            );
          },
        },
      ],
    },
    {
      title: 'Umahiri wa Kuandika',
      fixed: 'left',
      children: [
        {
          title: 'Imla',
          dataIndex: 'imla',
          key: 'imla',
          width: '3%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'imla',
          key: 'imlav',
          width: '4%',
          render: (marks) => {
            const percentage = getComment40(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kupigia Mistari Maneno Yaliyochanganyiwa',
          dataIndex: 'hzm',
          key: 'hzm',
          width: '6%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'hzm',
          key: 'hzmv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment20(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Alama za uandishi',
          dataIndex: 'uaf',
          key: 'uaf',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'uaf',
          key: 'uafv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment16(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kutambua Majina Ya Vitu',
          dataIndex: 'picha',
          key: 'picha',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'picha',
          key: 'pichav',
          width: '4%',
          render: (marks) => {
            const percentage = getComment24(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Jumla',
          dataIndex: 'kuaT',
          key: 'kuaT',
          width: '3%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'kuaT',
          key: 'kuaTv',
          width: '4%',
          render: (marks) => {
            const percentage = getComment100(marks);
            return (
              <>{percentage}</>
            );
          },
        },

      ],
    },
    {
      title: 'Umahiri wa Kuhesabu',
      children: [
        {
          title: 'Utambuzi wa Namba',
          dataIndex: 'uta',
          key: 'uta',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'uta',
          key: 'utav',
          width: '4%',
          render: (marks) => {
            const percentage = getComment20(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kujumlisha Ngazi ya I',
          dataIndex: 'jum1',
          key: 'jum1',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'jum1',
          key: 'jum1v',
          width: '4%',
          render: (marks) => {
            const percentage = getComment8(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kujumlisha Ngazi ya II',
          dataIndex: 'jum2',
          key: 'jum2',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'jum2',
          key: 'jum2v',
          width: '4%',
          render: (marks) => {
            const percentage = getComment12(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kutoa Ngazi ya I',
          dataIndex: 'kut1',
          key: 'kut1',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'kut1',
          key: 'kut1v',
          width: '4%',
          render: (marks) => {
            const percentage = getComment8(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Kutoa Ngazi ya II',
          dataIndex: 'kut2',
          key: 'kut2',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'kut2',
          key: 'kut2',
          width: '4%',
          render: (marks) => {
            const percentage = getComment12(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Namba Inayokosekana',
          dataIndex: 'nz',
          key: 'nz',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'nz',
          key: 'nz',
          width: '4%',
          render: (marks) => {
            const percentage = getComment24(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Mafumbo',
          dataIndex: 'maf',
          key: 'maf',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'maf',
          key: 'maf',
          width: '4%',
          render: (marks) => {
            const percentage = getComment16(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Jumla',
          dataIndex: 'hesT',
          key: 'hesT',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'hesT',
          key: 'hesT',
          width: '4%',
          render: (marks) => {
            const percentage = getComment100(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Jumla Ya Alama',
          dataIndex: 'jumla',
          key: 'jumla',
          width: '4%',
        },
        {
          title: 'Ubora wa Ufaulu',
          dataIndex: 'jumla',
          key: 'jumla',
          width: '4%',
          render: (marks) => {
            const percentage = getComment(marks);
            return (
              <>{percentage}</>
            );
          },
        },
        {
          title: 'Wastani',
          dataIndex: 'jumla',
          key: 'jumla',
          width: '4%',
          render: (marks) => {
            const percentage = progressTowardsThreshold(marks);
            return (
              <>{percentage}</>
            );
          },
        },
      ],
    },
  ];

  // report ya shule chart
  const averageData = [
    {
      Eneo: "SZH",
      Wastani: szhAverage(transformedData),
    },

    {
      Eneo: "MYK",
      Wastani: mykAverage(transformedData),
    },

    {
      Eneo: "KKU",
      Wastani: kkuAverage(transformedData),
    },

    {
      Eneo: "Imla",
      Wastani: imlaAverage(transformedData),
    },

    {
      Eneo: "KMMY",
      Wastani: ndogoAverage(transformedData),
    },

    {
      Eneo: "AZU",
      Wastani: uanAverage(transformedData),
    },

    {
      Eneo: "Vitu",
      Wastani: vituAverage(transformedData),
    },

    {
      Eneo: "UTA",
      Wastani: utaAverage(transformedData),
    },

    {
      Eneo: "JUMI",
      Wastani: jum1Average(transformedData),
    },

    {
      Eneo: "JUMII",
      Wastani: jum2Average(transformedData),
    },

    {
      Eneo: "KUTI",
      Wastani: kut1Average(transformedData),
    },

    {
      Eneo: "KUTII",
      Wastani: kut2Average(transformedData),
    },

    {
      Eneo: "NZ",
      Wastani: nzAverage(transformedData),
    },

    {
      Eneo: "Mafumbo",
      Wastani: mafAverage(transformedData),
    },
  ];

  const COLORS = [
    "#43BF2A",
    "#BFB82A",
    "#2A80BF",
    "#722ABF",
    "#BF2AA6",
    "#BA2ABF",
    "#D97B2D",
    "#D9322D",
    "#05118C",
  ];

  const SubTaskAverage = () => (
    <div className="container">
      <h4>Wastani wa kila Ukarasa</h4>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          cx={"50%"}
          data={averageData}
          margin={{ top: 10, bottom: 10, left: 30, right: 30 }}
        >
          <XAxis dataKey={"Eneo"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"Wastani"} fill={COLORS[1]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );


  const handlePDF = () => {
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
    const table2Headers = columnsa.map(col => col.title);
    const table2Data = dataSource.map(row => columnsa.map(col => row[col.dataIndex]));

    // Add the second table to the PDF
    doc.autoTable({
      head: [table2Headers],
      body: table2Data,
      startY: doc.autoTable.previous.finalY + 10, // Starting position for the second table
      styles: { fontSize: 7, cellPadding: 1 },
      tableWidth: '3rem',
    });

    // Save the PDF
    doc.save('Ripoti_ya_shule_ya' + school + '_' + schoolNo + '.pdf');
  };

  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h4>Ripoti ya Shule</h4>
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
                    <label>Shule</label>
                    {isLoadingSchool ? (
                      <p>Loading...</p>
                    ) : isErrorSchool ? (
                      <p>Error loading Shule.</p>
                    ) : (
                      <select
                        className="form-control"
                        onChange={(e) => {
                          const selectedSchool = schools.find(y => y.school_reg_number === e.target.value);
                          setSchoolNo(e.target.value);
                          setSchool(selectedSchool ? selectedSchool.school_name : '');
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>--Chagua--</option>
                        {schools?.map((y) => (
                          <option key={y.id} value={y.school_reg_number}>
                            {y.school_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-sm-3 float-right">
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
                <div className="col-sm-3 float-right">
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

              <div className="row mt-3">
                <div className="col-sm-6 float-right">
                  {/* <h5> Report ya shule ya <h5/> */}
                </div>

                <div className="col-sm-6 float-right">

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      <section className="content">
        {isLoadingSchoolReport && <p>Loading...</p>}
        {/* {isErrorSchoolReport && <p>Error loading months.</p>} */}
        {!isLoadingSchoolReport && !isErrorSchoolReport && (
          <>
            <div className="container-fluid">
              <div className='row my-3'>
                <div className='col-10'>
                  <h4 className='text-center'>
                    Ripoti ya shule ya {school} - {schoolNo}
                  </h4>
                </div>
                <div className='col-2'>
                  <Button type="primary" onClick={() => handlePDF()}>Chapisha PDF </Button>
                </div>
                <hr />
              </div>
              <div className="row">
                <div className='col-sm-12 mb-3'>
                  <h4>Ujumla ya Wanafunzi</h4>

                  <Table
                    className='custom-table'
                    columns={columns1}
                    dataSource={data1}
                    pagination={false} />
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <Table
                    className='custom-table'
                    columns={columns}
                    dataSource={schoolReport}
                    scroll={{
                      x: 4000,
                    }} />
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-12 py-5">
                  <Table
                    dataSource={dataSource}
                    columns={columnsa}
                    pagination={false}
                    classNamea='custom-table'
                    scroll={{
                      x: 300,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-12 h-6">
                  <SubTaskAverage />
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
