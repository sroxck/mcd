<template>
  <div class="app-container">
    <!-- 查询表单 绑定 query字段-->
    <el-row style="margin-bottom: 20px">
      <el-input
        placeholder="请输入餐厅名称,按回车查询"
        size="small"
        prefix-icon="el-icon-search"
        v-model="query"
        @change="queryTable"
        style="width: 280px"
      ></el-input>
      <el-button
        @click="dialog = true"
        size="small"
        style="margin-left: 10px"
        v-ripple
        >新增餐厅</el-button
      >

      <el-button style @click="getList()" size="small" v-ripple>重置</el-button>
    </el-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">新增餐厅</span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <el-button @click="form.data.push({})">新增一行</el-button>
            <v-row v-for="(item, index) in form.data" :key="index">
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="餐厅编号"  v-model="item.hotelBianhao" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="item.hotelName" label="餐厅名称"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="城市"
                  v-model="item.hotelCity"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="邮箱" required v-model="item.hotelEmail"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="电话" v-model="item.hotelTel"  required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                 <v-text-field label="地址" v-model="item.hotelDizhi" required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
             <v-text-field
                  label="开业日期"
                  required
                  v-model="item.hotelTime"
                ></v-text-field>

              </v-col>
              <v-col>
                <v-divider></v-divider>

              </v-col>


            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            关闭
          </v-btn>
          <v-btn color="blue darken-1" text @click="addItem">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 新增的弹框 绑定 form对象-->
    <el-dialog title="新增配件" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-button @click="form.data.push({})">新增一行</el-button>
        <el-row v-for="(item, index) in form.data" :key="index">
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="item.hotelCity" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅编号" :label-width="formLabelWidth">
            <el-input v-model="item.hotelBianhao" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅名称" :label-width="formLabelWidth">
            <el-input v-model="item.hotelName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开业日期" :label-width="formLabelWidth">
            <el-input v-model="item.hotelTime" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="item.hotelEmail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅电话" :label-width="formLabelWidth">
            <el-input v-model="item.hotelTel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐厅地址" :label-width="formLabelWidth">
            <el-input v-model="item.hotelDizhi" autocomplete="off"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示的表格 绑定 tableList数组-->
    <!-- <v-data-table
    :headers="headers"
    :items="tableList"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table> -->
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      size="small"
      border
      fit
      stripe
    >
      <el-table-column
        label="序号"
        type="index"
        width="50px"
        align="center"
      ></el-table-column>
      <el-table-column label="城市" prop="hotelCity"></el-table-column>
      <el-table-column
        label="餐厅编号"
        width="120px"
        prop="hotelBianhao"
      ></el-table-column>
      <el-table-column label="餐厅名称" prop="hotelName"></el-table-column>
      <el-table-column
        label="开业日期"
        width="120px"
        prop="hotelTime"
      ></el-table-column>
      <el-table-column label="邮箱" prop="hotelEmail"></el-table-column>
      <el-table-column label="餐厅电话" prop="hotelTel"></el-table-column>
      <el-table-column label="餐厅地址" prop="hotelDizhi"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的抽屉 绑定 modifyData对象-->
    <el-dialog
      title="编辑配件信息"
      :visible.sync="drawer"
      :before-close="handleClose"
      class="tk"
    >
      <el-form :model="modifyData" :inline="true" label-position="left">
        <el-form-item label="城市" label-width="70px">
          <el-input
            v-model="modifyData.hotelCity"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="餐厅编号" label-width="70px">
          <el-input
            v-model="modifyData.hotelBianhao"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="餐厅名称" label-width="70px">
          <el-input
            v-model="modifyData.hotelName"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="开业日期" label-width="70px">
          <el-input
            v-model="modifyData.hotelTime"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="70px">
          <el-input
            v-model="modifyData.hotelEmail"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="餐厅电话" label-width="70px">
          <el-input
            v-model="modifyData.hotelTel"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
        <el-form-item label="餐厅地址" label-width="70px">
          <el-input
            v-model="modifyData.hotelDizhi"
            autocomplete="off"
            style="width: 120px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editData">确 定</el-button>
        <el-button @click="drawer = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 分页组件 -->
    <pagination
      v-show="form.totalRow > 0"
      :total="form.totalRow"
      :page.sync="form.pageNumber"
      :limit.sync="form.pageSize"
      @pagination="getList"
      :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
    />

    <div class="mx-4 hidden-sm-and-down"></div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // 分页

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      headers:[
          { text: '城市', value: 'hotelCity' },
          { text: '餐厅名称', value: 'hotelName' },
          { text: '邮箱', value: 'hotelEmail' },
          { text: '餐厅电话', value: 'hotelTel' },
          { text: '餐厅地址', value: 'hotelDizhi' },
          { text: '餐厅编号', value: 'hotelBianhao' },
      ],
      dialog: false,
      grop: {
        data: [{}],
      },
      query: "", // 查询输入框绑定的字段
      tableList: [], // 表格绑定的数组
      listLoading: false, // 表格 loading 字段
      dialogFormVisible: false, // 控制新增弹框打开
      drawer: false, // 控制修改抽屉打开
      form: {
        // 新增绑定的对象
        data: [{}], // 用于新增一组数据
        pageNumber: 1, // 分页查询需要的字段
        pageSize: 15, // 分页查询需要的字段
        totalRow: 0, // 分页查询需要的字段
      },
      modifyData: {
        // 修改抽屉绑定的对象
        hotelDizhi: "",
        hotelTel: "",
        hotelEmail: "",
        hotelTime: "",
        hotelName: "",
        hotelBianhao: "",
        hotelCity: "",
        id: "",
      },
      formLabelWidth: "120px", // 表单 label 绑定的宽度
    };
  },
  created() {
    this.getList();
  },
  methods: {
    queryTable() {
      console.log(this.query);
      this.http.QueryHotel({ query: this.query }).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
      this.query = "";
    },
    handleClose() {
      this.$confirm("确定要关闭吗？")
        .then((_) => {
          this.drawer = false;
        })
        .catch((_) => {
          this.drawer = true;
        });
    },
    remove(id) {
      this.$confirm("此操作将永久删除该配件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http.removeHotel({ id }).then((res) => {
            if (res.code == 200) {
              this.$notify.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$notify({
            duration: 2000,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editData() {
      this.http.modifyHotel(this.modifyData).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("修改成功");
          this.drawer = false;
        }
      });
    },
    edit(row) {
      console.log(row);
      this.drawer = true;
      this.modifyData.hotelDizhi = row.hotelDizhi;
      this.modifyData.hotelTel = row.hotelTel;
      this.modifyData.id = row._id;
      this.modifyData.hotelEmail = row.hotelEmail;
      this.modifyData.hotelTime = row.hotelTime;
      this.modifyData.hotelName = row.hotelName;
      this.modifyData.hotelBianhao = row.hotelBianhao;
      this.modifyData.hotelCity = row.hotelCity;
    },
    addItem() {
      this.dialogFormVisible = false;
      this.http.addHotel(this.form).then((res) => {
        console.log(res, "22");
        if (res.code == 200) {
          this.getList();
          this.$notify.success("新增成功");
          this.form.data = [{}];
        } else {
          this.$notify.success("新增失败,请联系管理员");
        }
      });
    },
    getList() {
      this.listLoading = true;
      let info = {
        pageNumber: this.form.pageNumber,
        pageSize: this.form.pageSize,
      };
      this.http.QueryHotel(info).then((res) => {
        this.tableList = res.data;
        this.listLoading = false;
        this.form.totalRow = res.total;
      });
    },
  },
};
</script>
<style lang="scss">
.close {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>