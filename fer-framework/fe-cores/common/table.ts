import { useState, useEffect, useCallback } from "react";

const useHookTable = (config = {}) => {
  const {
    apiFunction,
    columns = [],
    initialParams = {},
    pagination: paginationConfig = {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} của ${total} bản ghi`,
    },
  } = config;

  const data = [
    {
      key: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      age: 25,
      address: "123 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
      phone: "0901234567",
    },
    {
      key: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      age: 30,
      address: "456 Đường Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh",
      phone: "0912345678",
    },
    {
      key: "3",
      name: "Lê Văn C",
      email: "levanc@example.com",
      age: 28,
      address: "789 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "0987654321",
    },
    {
      key: "4",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      age: 35,
      address: "12 Đường Phạm Văn Đồng, Quận Thủ Đức, TP. Hồ Chí Minh",
      phone: "0934567890",
    },
  ];

  // States
  const [dataSource, setDataSource] = useState(data);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(paginationConfig);
  const [params, setParams] = useState(initialParams);

  //   // API call function
  //   const fetchData = useCallback(
  //     async (requestParams = {}) => {
  //       if (!apiFunction) {
  //         console.warn("API function is not provided");
  //         return;
  //       }

  //       setLoading(true);
  //       try {
  //         const finalParams = {
  //           ...params,
  //           ...requestParams,
  //           page: requestParams.page || pagination.current,
  //           pageSize: requestParams.pageSize || pagination.pageSize,
  //         };

  //         const response = await apiFunction(finalParams);

  //         // Giả định API trả về dạng { data: [], total: number }
  //         // Bạn có thể tùy chỉnh theo format API của mình
  //         const { data = [], total = 0 } = response;

  //         setDataSource(data);
  //         setPagination((prev) => ({
  //           ...prev,
  //           total,
  //           current: finalParams.page,
  //           pageSize: finalParams.pageSize,
  //         }));
  //       } catch (error) {
  //         console.error("Error fetching table data:", error);
  //         message.error("Có lỗi xảy ra khi tải dữ liệu");
  //         setDataSource([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     [apiFunction, params, pagination.current, pagination.pageSize]
  //   );

  //   // Refresh table data
  //   const refresh = useCallback(() => {
  //     fetchData();
  //   }, [fetchData]);

  // Handle table change (pagination, filters, sorter)
  const handleTableChange = useCallback(
    (newPagination, filters, sorter) => {
      const newParams = {
        page: newPagination.current,
        pageSize: newPagination.pageSize,
      };

      // Handle filters
      if (filters) {
        Object.keys(filters).forEach((key) => {
          if (filters[key] && filters[key].length > 0) {
            newParams[key] = filters[key];
          }
        });
      }

      // Handle sorter
      if (sorter && sorter.field) {
        newParams.sortField = sorter.field;
        newParams.sortOrder = sorter.order;
      }

      setParams((prev) => ({ ...prev, ...newParams }));
      //   fetchData(newParams);
    },
    // [fetchData]
    []
  );

  // Update search params
  const updateParams = useCallback(
    (newParams) => {
      const updatedParams = { ...params, ...newParams, page: 1 };
      setParams(updatedParams);
      setPagination((prev) => ({ ...prev, current: 1 }));
      //   fetchData(updatedParams);
    },
    // [params, fetchData]
    [params]
  );

  // Reset table
  const reset = useCallback(() => {
    setParams(initialParams);
    setPagination(paginationConfig);
    // fetchData(initialParams);
    //   }, [initialParams, paginationConfig, fetchData]);
  }, [initialParams, paginationConfig]);

  //   // Initial data fetch
  //   useEffect(() => {
  //     if (apiFunction) {
  //       fetchData();
  //     }
  //   }, []);

  // Hook APIs
  const hookApis = {
    // refresh,
    updateParams,
    reset,
    setDataSource,
    setLoading,
  };

  // Table props
  const tableProps = {
    dataSource,
    columns,
    loading,
    pagination,
    onChange: handleTableChange,
    rowKey: "id",
  };

  return {
    hookApis,
    dataSource,
    columns,
    loading,
    pagination,
    params,
    tableProps,
    // refresh,
  };
};

export default useHookTable;
