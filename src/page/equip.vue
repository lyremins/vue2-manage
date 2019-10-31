<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="filed1"
		        label="装备名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="filed2"
		        label="所属分队"
		        width="80">
		      </el-table-column>
              <el-table-column
                prop="filed3"
                label="型号"
                width="180">
              </el-table-column>
            <el-table-column
                prop="filed4"
                label="出厂日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="filed5"
                label="大修次数"
                width="180">
              </el-table-column>
            <el-table-column
                prop="filed6"
                label="剩余寿命"
                width="180">
              </el-table-column>
            <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
		    </el-table>
		    <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改装备信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="装备名称" label-width="100px">
                        <el-input v-model="selectTable.filed1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所属分队" label-width="100px">
                        <el-input v-model="selectTable.filed2"></el-input>
                    </el-form-item>
                    <el-form-item label="型号" label-width="100px">
                        <el-input v-model="selectTable.filed3"></el-input>
                    </el-form-item>
                    <el-form-item label="出厂日期" label-width="100px">
                        <el-input v-model="selectTable.filed4"></el-input>
                    </el-form-item>
                    <el-form-item label="大修次数" label-width="100px">
                        <el-input v-model="selectTable.filed5"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余寿命" label-width="100px">
                        <el-input v-model="selectTable.filed6"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePerson">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { getEquip,getEquipCount,getEquipById,updateEquip,deleteEquip } from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getEquipCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getEquip();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getEquip()
            },
            async getEquip(){
                try{
                    const res = await getEquip({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                                equip_id: item.equip_id,
                                filed1: item.filed1,
                    			filed2: item.filed2,
						        filed3: item.filed3,
						        filed4: item.filed4,
                                filed5: item.filed5,
                                filed6: item.filed6
                    		}
                    		this.tableData.push(tableItem)
                        })
                    }else{
                    	throw new Error(res.message)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleEdit(index,row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
                console.log(row);
                const equip = await getEquipById(row.equip_id);
                console.log(equip);
                this.selectTable = {...row, ...{
                    filed1: equip.filed1,
                    filed2: equip.filed2,
                    filed3: equip.filed3,
                    filed4: equip.filed4,
                    filed5: equip.filed5}};

                this.tableData.splice(row.index, 1, {...this.selectTable});
            },
            async updatePerson(){
                this.dialogFormVisible = false;
                try{
                	const postData = {...this.selectTable};
                    const res = await updateEquip(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getEquip();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新信息失败', err);
                }
            },
            async handleDelete(index,row) {
                try{
                    console.log(row.equip_id);
                    const res = await deleteEquip(row.equip_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除失败')
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>


