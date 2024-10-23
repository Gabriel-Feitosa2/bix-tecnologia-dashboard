"use client";
import { trasactions } from "@/data/transactions";
import { formatAmount, formatDate, formatMoney } from "@/util/formats";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card } from "../style";
import { useEffect, useState } from "react";
import { states } from "@/data/states";
import { industry } from "@/data/industry";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Table() {
  const [dataTrasactions, setDataTrasactions] = useState(trasactions);
  const [selectState, setSelectState] = useState("");
  const [selectIndustry, setSelectIndustry] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const columns: GridColDef<(typeof trasactions)[number]>[] = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      disableColumnMenu: true,
      renderCell: (value) => <p>{formatDate(value.row.date)}</p>,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
      disableColumnMenu: true,
      renderCell: (value) => (
        <p>{formatMoney(formatAmount(value.row.amount))}</p>
      ),
    },
    {
      field: "transaction_type",
      headerName: "Transaction Type",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "account",
      headerName: "Account",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "industry",
      headerName: "Industry",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 200,
      disableColumnMenu: true,
      renderCell: (value) => (
        <p>
          {states.find((state) => state?.value === value?.row?.state).label}
        </p>
      ),
    },
  ];

  const clearAll = () => {
    setSelectState("");
    setSelectIndustry("");
    setDate(null);
    setDataTrasactions(trasactions);
  };

  useEffect(() => {
    if (selectState !== "" && selectIndustry === "") {
      const filterData = trasactions.filter(
        (value) =>
          value.state === selectState &&
          (date
            ? new Date(value.date).toDateString() === date.$d.toDateString()
            : new Date().toDateString() > new Date(value.date).toDateString())
      );

      setDataTrasactions(filterData);
      return;
    }
    if (selectState === "" && selectIndustry !== "") {
      const filterData = trasactions.filter(
        (value) => value.industry === selectIndustry
      );

      setDataTrasactions(filterData);
      return;
    }
    if (selectState !== "" && selectIndustry !== "") {
      const filterData = trasactions.filter(
        (value) =>
          value.state === selectState && value.industry === selectIndustry
      );

      setDataTrasactions(filterData);
      return;
    }
  }, [selectIndustry, selectState, date]);

  return (
    <div style={{ height: "fit-content", width: "100%" }}>
      <Card style={{ marginTop: 12 }}>
        <>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 12,
            }}
          >
            <>
              <h2>Filters</h2>

              <div style={{ display: "flex", gap: 14 }}>
                <FormControl style={{ width: "10vw" }}>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectState}
                    label="state"
                    onChange={(event) => setSelectState(event.target.value)}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    {states.map((state, index) => (
                      <MenuItem value={state.value} key={index}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "10vw" }}>
                  <InputLabel id="demo-simple-select-label">
                    Industry
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectIndustry}
                    label="state"
                    onChange={(event) => setSelectIndustry(event.target.value)}
                  >
                    {industry.map((industry, index) => (
                      <MenuItem value={industry} key={index}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Button onClick={() => clearAll()}>Clear all filters</Button>
              </div>
            </>
          </div>
          <Divider />
          <div style={{ width: "75vw", marginTop: 14 }}>
            <DataGrid
              rows={dataTrasactions}
              columns={columns}
              getRowId={(row) => row.date}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </>
      </Card>
    </div>
  );
}
