package org.jeecg.modules.demo.content.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.demo.content.entity.SysContent;
import org.jeecg.modules.demo.content.service.ISysContentService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.jeecg.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

 /**
 * @Description: 内容配置表
 * @Author: jeecg-boot
 * @Date:   2023-05-05
 * @Version: V1.0
 */
@Api(tags="内容配置表")
@RestController
@RequestMapping("/content/sysContent")
@Slf4j
public class SysContentController extends JeecgController<SysContent, ISysContentService> {
	@Autowired
	private ISysContentService sysContentService;
	
	/**
	 * 分页列表查询
	 *
	 * @param sysContent
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "内容配置表-分页列表查询")
	@ApiOperation(value="内容配置表-分页列表查询", notes="内容配置表-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<SysContent>> queryPageList(SysContent sysContent,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
		QueryWrapper<SysContent> queryWrapper = QueryGenerator.initQueryWrapper(sysContent, req.getParameterMap());
		Page<SysContent> page = new Page<SysContent>(pageNo, pageSize);
		IPage<SysContent> pageList = sysContentService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param sysContent
	 * @return
	 */
	@AutoLog(value = "内容配置表-添加")
	@ApiOperation(value="内容配置表-添加", notes="内容配置表-添加")
	@RequiresPermissions("content:sys_content:add")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody SysContent sysContent) {
		sysContentService.save(sysContent);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param sysContent
	 * @return
	 */
	@AutoLog(value = "内容配置表-编辑")
	@ApiOperation(value="内容配置表-编辑", notes="内容配置表-编辑")
	@RequiresPermissions("content:sys_content:edit")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody SysContent sysContent) {
		sysContentService.updateById(sysContent);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "内容配置表-通过id删除")
	@ApiOperation(value="内容配置表-通过id删除", notes="内容配置表-通过id删除")
	@RequiresPermissions("content:sys_content:delete")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		sysContentService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "内容配置表-批量删除")
	@ApiOperation(value="内容配置表-批量删除", notes="内容配置表-批量删除")
	@RequiresPermissions("content:sys_content:deleteBatch")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.sysContentService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "内容配置表-通过id查询")
	@ApiOperation(value="内容配置表-通过id查询", notes="内容配置表-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<SysContent> queryById(@RequestParam(name="id",required=true) String id) {
		SysContent sysContent = sysContentService.getById(id);
		if(sysContent==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(sysContent);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param sysContent
    */
    @RequiresPermissions("content:sys_content:exportXls")
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, SysContent sysContent) {
        return super.exportXls(request, sysContent, SysContent.class, "内容配置表");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequiresPermissions("content:sys_content:importExcel")
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, SysContent.class);
    }

}
