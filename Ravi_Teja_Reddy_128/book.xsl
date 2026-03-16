<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<head>

<link rel="stylesheet" type="text/css" href="book.css"/>

<title>Book Chapter</title>

</head>

<body>

<div class="container">

<div class="chapter-number">
<xsl:value-of select="book/chapter/number"/>
</div>

<div class="chapter-title">
<xsl:value-of select="book/chapter/title"/>
</div>

<div class="intro">
<xsl:value-of select="book/chapter/intro"/>
</div>

<xsl:for-each select="book/chapter/paragraph">
<p class="paragraph">
<xsl:value-of select="."/>
</p>
</xsl:for-each>

<div class="section-heading">
<xsl:value-of select="book/chapter/section/heading"/>
</div>

<xsl:for-each select="book/chapter/section/paragraph">
<p class="paragraph">
<xsl:value-of select="."/>
</p>
</xsl:for-each>

</div>

</body>

</html>

</xsl:template>

</xsl:stylesheet>