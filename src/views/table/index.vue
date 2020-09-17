<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="配件名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="配件厂商">
        <el-input></el-input>
      </el-form-item>
      <el-button>查询</el-button>
      <el-button>新增</el-button>
      <el-button>导出</el-button>
      <input type="file" @change="importf(this)" class="btn-dr" />
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column> -->
      <el-table-column label="序号" prop=index></el-table-column>

      <el-table-column label="货物名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="初期数量" prop=num></el-table-column>
      <el-table-column label="1" prop="s1"></el-table-column>
      <el-table-column label="2" prop="s2"></el-table-column>
      <el-table-column label="3" prop="s3"></el-table-column>
      <el-table-column label="4" prop="s4"></el-table-column>
      <el-table-column label="5" prop="s5"></el-table-column>
      <el-table-column label="6" prop="s6"></el-table-column>
      <el-table-column label="7" prop="s7"></el-table-column>
      <el-table-column label="8" prop="s8"></el-table-column>
      <el-table-column label="9" prop="s9"></el-table-column>
      <el-table-column label="10" prop="s10"></el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      tableList:[]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    importf(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串

      var f = this.file;

      var reader = new FileReader();

      //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require("xlsx");

          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }

          // outdata就是你想要的东西 excel导入的数据

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

          // excel 数据再处理

          let arr = [];
          console.log(outdata);
          outdata.map((v) => {
            let obj = {};

            obj.index = v.序号;

            obj.name = v.货物名称;

            obj.number = v.初期数量;
            obj.s1 = v["1"];
            obj.s2 = v["2"];
            obj.s3 = v["3"];
            obj.s4 = v["4"];
            obj.s5 = v["5"];
            obj.s6 = v["6"];
            obj.s7 = v["7"];
            obj.s8 = v["8"];
            obj.s9 = v["9"];
            obj.s10 = v["10"];
            obj.s11 = v["11"];
            obj.s12 = v["12"];
            obj.s13 = v["13"];
            obj.s14 = v["14"];
            obj.s15 = v["15"];
            obj.s16 = v["16"];
            obj.s17 = v["17"];
            obj.s18 = v["18"];
            obj.s19 = v["19"];
            obj.s20 = v["20"];
            obj.s21 = v["21"];
            obj.s22 = v["22"];
            obj.s23 = v["23"];
            obj.s24 = v["24"];
            obj.s25 = v["25"];
            obj.s26 = v["26"];
            obj.s27 = v["27"];
            obj.s28 = v["28"];
            obj.s29 = v["29"];
            obj.s30 = v["30"];
            obj.s31 = v["31"];

            obj.shengYu = v.剩余;

            obj.status = v.状态;

            obj.id = v.id;

            arr.push(obj);
          });

          _this.tableList = [...arr];

          console.log(_this.tableList);

          _this.reload();
        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">

</style>