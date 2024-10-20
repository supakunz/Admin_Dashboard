"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import IconifyIcon from "../../components/base/IconifyIcon";
import SearchFilter from "../../components/common/SearchFilter";
import CustomPagination from "../../components/common/CustomPagination";
import { columns, rows } from "../../data/reminderTableData";
import AddProject from "../addproject/AddProject";
import { useContext, useEffect, useState } from "react";
import { getdata } from "@/functions/product";
import { ProductContext } from "@/providers/ProductProvider";

const ReminderTable = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { setProductData, productData } = useContext(ProductContext);
  // const [data, setProductData] = useState([]);
  const apiRef = useGridApiRef();

  useEffect(() => {
    getdata()
      .then((res) => setProductData(res.data.response))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);
  return (
    <>
      <Paper
        sx={(theme) => ({
          p: theme.spacing(2, 4.5),
          width: 1,
        })}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h5" color="common.black">
            Reminder
          </Typography>

          <SearchFilter apiRef={apiRef} />

          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            color="secondary"
            sx={(theme) => ({
              p: theme.spacing(0.625, 1.5),
              borderRadius: 1.5,
            })}
            startIcon={<IconifyIcon icon="heroicons-solid:plus" />}
          >
            <Typography variant="body2">Add New</Typography>
          </Button>
        </Stack>

        <Box
          sx={{
            height: 380,
            width: 1,
            mt: 1.75,
          }}
        >
          <DataGrid
            apiRef={apiRef}
            columns={columns}
            rows={productData} // ** Data from API ** #mockup -> rows
            rowHeight={60}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
          />
        </Box>
        <CustomPagination apiRef={apiRef} />
      </Paper>
      <AddProject isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ReminderTable;