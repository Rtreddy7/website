<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<html>
<head>

<link rel="stylesheet" type="text/css" href="practice2.css"/>

<title>Book Page</title>

</head>

<body>

<div class="page">

<xsl:apply-templates select="book/chapter/*"/>

</div>

</body>
</html>

</xsl:template>


<xsl:template match="paragraph">
<p class="paragraph">
<xsl:apply-templates/>
</p>
</xsl:template>


<xsl:template match="italic">
<p class="italic">
<xsl:value-of select="."/>
</p>
</xsl:template>


<xsl:template match="center">
<p class="center">
<xsl:value-of select="."/>
</p>
</xsl:template>


<xsl:template match="dialogue">
<p class="dialogue">
<xsl:value-of select="."/>
</p>
</xsl:template>


<xsl:template match="clue">
<p class="clue">
<xsl:apply-templates/>
</p>
</xsl:template>


<xsl:template match="bold">
<span class="bold">
<xsl:value-of select="."/>
</span>
</xsl:template>


</xsl:stylesheet>