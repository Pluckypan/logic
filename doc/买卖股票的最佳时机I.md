买卖股票的最佳时机I
===
买卖股票的最佳时机

<!-- eedoc {
"banner":false,
"create_time":"2020-01-11 23:59:05",
"update_time":"2020-01-11 23:59:05",
"category":"简单",
"tags":["简单","数组","股票"]
} eedoc -->

<!-- write below -->

## 题述
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你最多只能买卖一支股票。

## 示例
假定最近六天股票价格如下 `[7,1,5,3,6,4]`,为了获取利益最大化,你可以第2天买入,第5天卖出,可获得收益`$=6-1`.所以一共可以获得`$=5`

## 审题
1. 只能买卖一支股票

## 暴力法
``` java
public static int maxProfit(int[] prices) {
	int len = prices.length;
	if (len < 1) return 0;
	int max = 0;
	for (int i = 0; i < len; i++) {
		for (int j = i + 1; j < len; j++) {
			if (prices[j] - prices[i] > max) {
				max = prices[j] - prices[i];
			}
		}
	}
	return max;
}
```
暴力法,采用双重循环,时间复杂度 `O(n²)`

## 一次遍历
``` java
public static int maxProfit(int[] prices) {
	int len = prices.length;
	if (len < 1) return 0;
	int max = 0;
	int min = prices[0];
	for (int i = 1; i < len; i++) {
		if (prices[i] < min) {
			min = prices[i];
		}
		if (prices[i] - min > max) {
			max = prices[i] - min;
		}
	}
	return max;
}
```
一次遍历的主要思路是,只关心最低点和最高点,得出后续出现的点与最低点的最大差值即为最大收益.时间复杂度 `O(n)`