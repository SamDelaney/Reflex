<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output method="html" version="4.0" encoding="UTF-8" omit-xml-declaration="yes" indent="yes"/>

	<!-- Include the baseline in the output? Possible values: 0, 1-->
	<xsl:param name="pInclude_baseline"/>

	<!-- Name of language if you want it to appear in the example. String. eg. Icelandic -->
	<xsl:param name="pLanguage_name"/>

	<!-- Include language name in output and if so, where. Possible values: none, first, right. 
		First puts on the first line followed by example data. 
		Right puts it at the bottom of the example after the translation.-->
	<xsl:param name="pInclude_language"/>

	<!--Source reference: String eg. Payne, 1996: 67-69-->
	<xsl:param name="pSource_reference"/>

	<!--Include the source reference? See above for pLanguage_Name. Source references are placed between parentheses. 
		Possible values: none, first, right.-->
	<xsl:param name="pInclude_source_reference"/>

	<!--Show the literal translation? Possible values: 0,1-->
	<xsl:param name="pInclude_literal_trans"/>

	<!--Not yet implemented. Will put an asterisk before baseline or morpheme line. Also in Free and Literal translations.
		Possible values: 0,1-->
	<xsl:param name="pIndicate_ungrammatical"/>

	<!--Show notes? Possible values: 0,1-->
	<xsl:param name="pInclude_notes"/>

	<xsl:template match="document">
		<!-- NOTE, this DOCTYPE causes issues for tests that use AssertThatXmlIn to catch an error and display the DOM -->
		<!-- <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html[]&gt;</xsl:text> -->
		<html>
			<head>
				<!-- ======================== -->
				<title>Interlinear text: "<xsl:value-of
						select="interlinear-text/item[@type='title']"/>"</title>
				<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
				<meta name="keywords" content="interlinear texts"/>
				<style>
					h1{
					    font:1.2em "Doulos SIL", "Charis SIL", "Times New Roman", Times, serif;
					    margin:0;
					    background-color:yellow;
					}
					td{
					    height:1em;
					    vertical-align:bottom;
					    white-space:nowrap;
					}
					span{
					    display:inline-block;
					    vertical-align:top;
					}
					.itx_Frame_Number{
					    font:normal 1em serif;
					    display:inline;
					}
					.itxBaseline{
					    font-style:italic;
					}
					
					.lexMorpheme{
					    font-style:italic;
					}
					
					.lexGloss{
					    font-size:.9em;
					    color:maroon;
					}
					
					.itxFreeTranslation{
					    font:normal
					}
					.itxNotes{
					    margin-left:1em;
					    color:mediumblue;
					    font:normal 1em serif;
					}
					sub,
					sup{
					    display:none;
					}
					.hidden{
					    display:none;
					}</style>
				<title> &#160; </title>
			</head>
			<body>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>

	<!-- INTERLINEAR-TEXT LEVEL -->

	<xsl:template match="interlinear-text">
		<xsl:apply-templates/>
	</xsl:template>

	<!--<xsl:template match="interlinear-text/item[@type='title']">
		<h1>
			<xsl:attribute name="lang"> Title: <xsl:value-of select="@lang"/>
			</xsl:attribute>
			<xsl:apply-templates/>
		</h1>-->
	<!--</xsl:template>-->
	<!--xsl:template match="interlinear-text/item[@type='title-abbreviation']"/-->
	<!--xsl:template match="interlinear-text/item[@type='source']">
		<h2>
			<xsl:apply-templates/>
		</h2>
	</xsl:template-->
	<!--xsl:template match="interlinear-text/item[@type='description']">
		<h2>
			<xsl:apply-templates/>
		</h2>
	</xsl:template-->

	<!-- PARAGRAPH LEVEL -->
	<xsl:template match="paragraphs">
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="paragraph">
		<xsl:apply-templates/>
	</xsl:template>

	<!-- PHRASE LEVEL -->
	<xsl:template match="phrases">
		<xsl:apply-templates/>
	</xsl:template>

	<!--A flextext phrase is a FLEx segment-->
	<xsl:template match="phrase">
		<!--The segment number is stored in a variable. The variable is placed in the first column of the baseline and also in a hidden span of the morpheme line
			in case the baseline is hidden by the user-->
		<xsl:variable name="vSegmentNumber" select="item[@type='segnum']"/>
		<table class="itx_Words">
			<tbody>
				<!--Segment number and baseline words-->
				<!--Only display the baseline if $pInclude_baseline parameter is set to "1"-->
				<xsl:if test="$pInclude_language='first'">
					<tr class="LanguageNameFirstLine">
						<!--Segment number-->
						<td>
							<span class="itx_Frame_Number"> (<xsl:value-of select="$vSegmentNumber"
								/>) </span>
						</td>
						<xsl:variable name="vNumWords">
							<xsl:value-of
								select="count(words/word/item[@type='txt' or @type='punct'])"/>
						</xsl:variable>
						<td class="LanguageName">
							<xsl:attribute name="colspan">
								<xsl:value-of select="$vNumWords"/>
							</xsl:attribute>
							<xsl:value-of select="$pLanguage_name"/>
						</td>
					</tr>
				</xsl:if>
				<xsl:if test="$pInclude_source_reference='first'">
					<tr class="SourceReferenceFirstLine">
						<!--Segment number-->
						<td>
							<span class="itx_Frame_Number"> (<xsl:value-of select="$vSegmentNumber"
							/>) </span>
						</td>
						<xsl:variable name="vNumWords">
							<xsl:value-of
								select="count(words/word/item[@type='txt' or @type='punct'])"/>
						</xsl:variable>
						<td class="SourceReference">
							<xsl:attribute name="colspan">
								<xsl:value-of select="$vNumWords"/>
							</xsl:attribute>
							<xsl:value-of select="$pSource_reference"/>
						</td>
					</tr>
				</xsl:if>
				<xsl:if test="$pInclude_baseline='1'">
					<tr class="itxBaseline">
						<!--Segment number-->
						<td>
							<xsl:if test="$pInclude_language='not(first)'">
								<span class="itx_Frame_Number"> (<xsl:value-of
										select="$vSegmentNumber"/>) </span>
							</xsl:if>
						</td>
						<xsl:variable name="vNumWords">
							<xsl:value-of
								select="count(words/word/item[@type='txt' or @type='punct'])"/>
						</xsl:variable>
						<xsl:for-each select="words/word/item[@type='txt' or @type='punct'] ">
							<td class="itxBaseline">
								<xsl:value-of select="text()"/>
							</td>
						</xsl:for-each>
					</tr>
				</xsl:if>
				<!-- Lexemes row-->
				<!-- Note that the affix dashes are included in the morph, whereas in the gloss and the POS they are not-->
				<tr class="lexMorpheme">
					<!--Space in cell in column where the example number is housed-->
					<td>
						<xsl:if
							test="$pInclude_baseline=not('1') or $pInclude_language='not(first)'">
							<span class="lexMorphemeFrameNumber"> (<xsl:value-of
									select="$vSegmentNumber"/>) </span>
						</xsl:if>
					</td>
					<xsl:variable name="vNumWords">
						<xsl:value-of select="count(words/word/item[@type='txt' or @type='punct'])"
						/>
					</xsl:variable>
					<xsl:for-each select="words/word">
						<!--Want to include punctuation in the morpheme line in case the user decides to hide the baseline, which is standard Leipzig practice-->
						<xsl:choose>
							<xsl:when test="item[@type='punct']">
								<td>
									<xsl:value-of select="item/text()"/>
								</td>
							</xsl:when>
							<xsl:otherwise>
								<td>
									<xsl:for-each select="morphemes/morph">
										<!-- If the morpheme count is greater than 1 AND the morpheme type is root or stem AND the preceding morpheme was a root or a stem, then put an underscore before the morpheme
										In other words, if a word is made up of mutilple roots or stems, we need a way to separate these other than the hyphen.-->
										<xsl:if
											test="position()>1 and (@type='root' or @type='stem') and (preceding-sibling::node()/@type='root' or preceding-sibling::node()/@type='stem' or preceding-sibling::node()/@type='circumfix') "
											>_</xsl:if>
										<xsl:value-of select="item[@type='cf']/text()"/>
									</xsl:for-each>
								</td>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:for-each>
				</tr>
				<!-- LexGloss row-->
				<tr class="lexGloss">
					<!--Space in cell in column where the example number is housed-->
					<td>&#32;</td>
					<xsl:variable name="vNumWords">
						<xsl:value-of select="count(words/word/item[@type='txt' or @type='punct'])"
						/>
					</xsl:variable>
					<xsl:for-each select="words/word">
						<td>
							<xsl:for-each select="morphemes/morph">
								<xsl:if
									test="@type='suffix' or @type='suffixing interfix' or @type='infix'">
									<xsl:text>-</xsl:text>
								</xsl:if>
								<xsl:if test="@type='enclitic'">
									<xsl:text>=</xsl:text>
								</xsl:if>
								<!-- If the morpheme count is greater than 1 AND the morpheme type is root or stem AND the preceding morpheme was a root or a stem, then put an underscore before the morpheme
										In other words, if a word is made up of mutilple roots or stems, we need a way to separate these other than the hyphen.-->
								<xsl:if
									test="position()>1 and (@type='root' or @type='stem') and (preceding-sibling::node()/@type='root' or preceding-sibling::node()/@type='stem' or preceding-sibling::node()/@type='circumfix') "
									>_</xsl:if>
								<!--Need to test for FUNCTOR GLOSSES as substrings here and style as SMALL CAPS.
					Might be best to compare against a master list of functor morphemes glosses. -->
								<xsl:variable name="startcase">ABCDEFGHIJKLMNOPQRSTUVWXYZ </xsl:variable>
								<xsl:variable name="endcase"
									>ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘQʀꜱᴛᴜᴠᴡxʏᴢ.</xsl:variable>
								<!--<xsl:value-of select="item[@type='gls']/text()"/>-->
								<!--Also for proper nouns that begin with a capital, we do not want to SMALL CAPS the capital. 
									Here we test: 
									If the first letter of the gloss is a capital then
									    Check the first letter of the txt or cf lines to see if they are the same capital.
									         If so, then do not convert to small caps.-->
								<xsl:variable name="vFirstCapGloss">
									<!--Here we check to see if the first letter of the gloss is a capital-->
									<xsl:value-of select="substring(item[@type='gls']/text(),1,1)"/></xsl:variable>
								<xsl:variable name="vFirstCapMorph"
									select="substring(item[@type='cf']/text(),1,1)"/>
								<xsl:variable name="vFirstCapBaseLine"
									select="substring(item[@type='txt']/text(),1,1)"/>
								<xsl:variable name="vFirstCapWordBaseLine"
									select="substring(../../item[@type='txt']/text(),1,1)"/>
								<xsl:choose>
									<xsl:when
										test="$vFirstCapGloss=$vFirstCapMorph or $vFirstCapGloss=$vFirstCapBaseLine or $vFirstCapGloss=$vFirstCapWordBaseLine">
										<xsl:value-of select="item[@type='gls']/text()"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of
											select="translate(item[@type='gls']/text(), $startcase, $endcase)"
										/>
									</xsl:otherwise>
								</xsl:choose>
								<!--<font style="font-variant: small-caps"><xsl:value-of select="translate(., $startcase, $endcase)"/></font>-->
								<xsl:if
									test="@type='prefix' or @type='prefixing interfix' or @type='infix'">
									<xsl:text>-</xsl:text>
								</xsl:if>
								<xsl:if test="@type='proclitic'">
									<xsl:text>=</xsl:text>
								</xsl:if>
							</xsl:for-each>
						</td>
					</xsl:for-each>
				</tr>
				<!--In order to get the colspan correct, we need to count number of columns from above-->
				<xsl:variable name="vNumWords">
					<xsl:value-of select="count(words/word/item[@type='txt' or @type='punct'])"/>
				</xsl:variable>
				<!-- If Free translations exist for the segment then create Free translation row-->
				<xsl:if test="item[@type='gls']">
					<tr class="itxFreeTranslation">
						<td/>
						<td>
							<xsl:attribute name="colspan">
								<xsl:value-of select="$vNumWords"/>
							</xsl:attribute> &apos;<xsl:value-of select="item[@type='gls']"/>&apos;
								<xsl:if test="$pInclude_literal_trans='0'">
								<xsl:if test="$pInclude_language='right'">
									<xsl:text>&#160;</xsl:text><xsl:value-of
										select="$pLanguage_name"/>
								</xsl:if>
								<xsl:if test="$pInclude_source_reference='right'">
									<xsl:text>&#160;(</xsl:text><xsl:value-of
										select="$pSource_reference"/><xsl:text>)</xsl:text>
								</xsl:if>
							</xsl:if>
						</td>
					</tr>
				</xsl:if>
				<!-- If the user has selected the option to include the literal translation-->
				<xsl:if test="$pInclude_literal_trans='1'">
					<!-- If Literal translations exist for the segment then create Lit translation row-->
					<xsl:if test="item[@type='lit']">
						<tr class="itxLiteralTranslation">
							<td/>
							<td>
								<xsl:attribute name="colspan">
									<xsl:value-of select="$vNumWords"/>
								</xsl:attribute> (Lit: &apos;<xsl:value-of
									select="item[@type='lit']"/>&apos;) <xsl:if
									test="$pInclude_language='right'">
									<xsl:text>&#160;</xsl:text>
									<xsl:value-of select="$pLanguage_name"/>
								</xsl:if>
								<xsl:if test="$pInclude_source_reference='right'">
									<xsl:text>&#160;(</xsl:text>
									<xsl:value-of select="$pSource_reference"/>
									<xsl:text>)</xsl:text>
								</xsl:if>
							</td>
						</tr>
					</xsl:if>
				</xsl:if>
			</tbody>
		</table>
		<!-- Notes are little funky if they are contained in the same table as the interlinear due to their possible length compared to that of the segment. 
					To compensate for this, we create a paragraph for each note. -->
		<xsl:if test="$pInclude_notes='1'">
			<xsl:if test="item[@type='note']">
				<xsl:for-each select="item[@type='note']">
					<p class="itxNotes"> Note: <xsl:value-of select="."/>
					</p>
				</xsl:for-each>
			</xsl:if>
		</xsl:if>
		<!--<hr/>-->
	</xsl:template>

	<!-- MISCELLANEOUS -->
	<xsl:template match="i">
		<i>
			<xsl:apply-templates/>
		</i>
	</xsl:template>

	<xsl:template match="b">
		<b>
			<xsl:apply-templates/>
		</b>
	</xsl:template>

	<!--This is not currently used -->
	<!--<xsl:template match="*">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>-->

</xsl:stylesheet>
