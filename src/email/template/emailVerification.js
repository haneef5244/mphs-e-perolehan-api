const template = (namaPertama, verificationUrl) => (`<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>[MPHS-ePerolehan] Verifikasi Email </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
        @media screen {
            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }

            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }

        /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
        body,
        table,
        td,
        a {
            -ms-text-size-adjust: 100%;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
        }

        /**
   * Remove extra space added to tables and cells in Outlook.
   */
        table,
        td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
        }

        /**
   * Better fluid images in Internet Explorer.
   */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /**
   * Remove blue links for iOS devices.
   */
        a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }

        /**
   * Fix centering issues in Android 4.4.
   */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /**
   * Collapse table borders to avoid space between cells.
   */
        table {
            border-collapse: collapse !important;
        }

        a {
            color: #1a82e2;
        }

        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>

</head>

<body style="background-color: #e9ecef; padding-top: 50px !important;">

    <!-- start preheader -->
    <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Sahkan email anda.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <!-- start logo -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px; background: #ffffff;">
                    <tr>
                        <td align="center" valign="top">
                            <a href="https://mphs.gov.my/" target="_blank"
                                style="display: inline-block; margin-top:50px">
                                <img src="https://mdhs.blob.core.windows.net/public/mphs.png" border="0" width="200px"
                                    style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <h1
                                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
                                Sahkan Email Anda</h1>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Hi ${namaPertama}, Sila klik pada butang di bawah untuk mengesahkan
                                email
                                anda. Jika anda tidak mencipta akaun dengan kami, anda boleh abaikan email ini.</p>
                        </td>
                    </tr>
                    <!-- end copy -->

                    <!-- start button -->
                    <tr>
                        <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                    <a href=${verificationUrl} target="_blank"
                                                        style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Sahkan
                                                        Email</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- end button -->

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Jika butang di atas tidak berfungsi, anda boleh copy & paste url di
                                bawah di browser anda:</p>
                            <p style="margin: 0;"><a href=${verificationUrl} target="_blank">Klik disini</a></p>
                        </td>
                    </tr>
                    <!-- end copy -->

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Terima kasih,<br> MPHS e-Perolehan</p>
                        </td>
                    </tr>
                    <!-- end copy -->

                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->
        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                    <!-- start permission -->
                    <tr>
                        <td align="center" bgcolor="#e9ecef"
                            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">Anda telah terima email ini kerana anda telah mencipta akaun melalui
                                MPHS e-Perolehan. Jika anda tidak mencipta akaun dengan kami, sila abaikan email ini.</p>
                        </td>
                    </tr>
                    <!-- end permission -->
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end footer -->

    </table>
    <!-- end body -->

</body>

</html>`);

const claimUpdateTemplate = (namaPertama, referenceNo, approved, approverName, claimUrl) => (`<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>[MPHS-ePerolehan] [No. Rujukan ${referenceNo}] Maklumat Tuntutan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
		/**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
		@media screen {
			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 400;
				src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
			}

			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 700;
				src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
			}
		}

		/**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
		body,
		table,
		td,
		a {
			-ms-text-size-adjust: 100%;
			/* 1 */
			-webkit-text-size-adjust: 100%;
			/* 2 */
		}

		/**
   * Remove extra space added to tables and cells in Outlook.
   */
		table,
		td {
			mso-table-rspace: 0pt;
			mso-table-lspace: 0pt;
		}

		/**
   * Better fluid images in Internet Explorer.
   */
		img {
			-ms-interpolation-mode: bicubic;
		}

		/**
   * Remove blue links for iOS devices.
   */
		a[x-apple-data-detectors] {
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			color: inherit !important;
			text-decoration: none !important;
		}

		/**
   * Fix centering issues in Android 4.4.
   */
		div[style*="margin: 16px 0;"] {
			margin: 0 !important;
		}

		body {
			width: 100% !important;
			height: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		/**
   * Collapse table borders to avoid space between cells.
   */
		table {
			border-collapse: collapse !important;
		}

		a {
			color: #1a82e2;
		}

		img {
			height: auto;
			line-height: 100%;
			text-decoration: none;
			border: 0;
			outline: none;
		}
	</style>

</head>

<body style="background-color: #e9ecef; padding-top: 50px !important;">

	<!-- start preheader -->
	<div class="preheader"
		style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
		Maklumat Tuntutan Anda.
	</div>
	<!-- end preheader -->

	<!-- start body -->
	<table border="0" cellpadding="0" cellspacing="0" width="100%">

		<!-- start logo -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%"
					style="max-width: 600px; background: #ffffff;">
					<tr>
						<td align="center" valign="top">
							<a href="https://mphs.gov.my/" target="_blank" style="display: inline-block;">
								<img src="https://mdhs.blob.core.windows.net/public/mphs.png" border="0" width="200px"
									style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
							</a>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end logo -->

		<!-- start hero -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
							<h1
								style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
								Maklumat Tuntutan Anda</h1>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end hero -->

		<!-- start copy block -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Hi ${namaPertama}, Tuntutan anda untuk No. Rujukan ${referenceNo}
								telah ${approved} oleh ${approverName}. Sila klik pada butang di bawah untuk mengetahui
								lebih
								lanjut tentang maklumat tuntutan anda.</p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start button -->
					<tr>
						<td align="left" bgcolor="#ffffff">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
										<table border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
													<a href=${claimUrl} target="_blank"
														style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Lihat
														Tuntutan</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<!-- end button -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Jika butang di atas tidak berfungsi, anda boleh copy & paste url di
								bawah di browser anda:</p>
							<p style="margin: 0;"><a href=${claimUrl} target="_blank">Klik disini</a></p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
							<p style="margin: 0;">Terima kasih,<br> MPHS e-Perolehan</p>
						</td>
					</tr>
					<!-- end copy -->

				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end copy block -->

		<!-- start footer -->
		<tr>
			<td align="center" bgcolor="#e9ecef" style="padding: 24px;">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start permission -->
					<tr>
						<td align="center" bgcolor="#e9ecef"
							style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
							<p style="margin: 0;">Anda telah terima email ini kerana anda telah membuat tuntutan melalui
								MPHS e-Perolehan. Jika anda tidak membuat tuntutan, sila abaikan email ini.</p>
						</td>
					</tr>
					<!-- end permission -->
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end footer -->

	</table>
	<!-- end body -->

</body>

</html>`)

const paymentMadeTemplate = (namaPertama, referenceNo, amaunBayaran, approverName, claimUrl) => (`<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>[MPHS-ePerolehan] [No. Rujukan ${referenceNo}] Maklumat Tuntutan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
		/**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
		@media screen {
			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 400;
				src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
			}

			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 700;
				src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
			}
		}

		/**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
		body,
		table,
		td,
		a {
			-ms-text-size-adjust: 100%;
			/* 1 */
			-webkit-text-size-adjust: 100%;
			/* 2 */
		}

		/**
   * Remove extra space added to tables and cells in Outlook.
   */
		table,
		td {
			mso-table-rspace: 0pt;
			mso-table-lspace: 0pt;
		}

		/**
   * Better fluid images in Internet Explorer.
   */
		img {
			-ms-interpolation-mode: bicubic;
		}

		/**
   * Remove blue links for iOS devices.
   */
		a[x-apple-data-detectors] {
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			color: inherit !important;
			text-decoration: none !important;
		}

		/**
   * Fix centering issues in Android 4.4.
   */
		div[style*="margin: 16px 0;"] {
			margin: 0 !important;
		}

		body {
			width: 100% !important;
			height: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		/**
   * Collapse table borders to avoid space between cells.
   */
		table {
			border-collapse: collapse !important;
		}

		a {
			color: #1a82e2;
		}

		img {
			height: auto;
			line-height: 100%;
			text-decoration: none;
			border: 0;
			outline: none;
		}
	</style>

</head>

<body style="background-color: #e9ecef; padding-top: 50px !important;">

	<!-- start preheader -->
	<div class="preheader"
		style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
		Bayaran Tuntutan Anda.
	</div>
	<!-- end preheader -->

	<!-- start body -->
	<table border="0" cellpadding="0" cellspacing="0" width="100%">

		<!-- start logo -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%"
					style="max-width: 600px; background: #ffffff;">
					<tr>
						<td align="center" valign="top">
							<a href="https://mphs.gov.my/" target="_blank" style="display: inline-block;">
								<img src="https://mdhs.blob.core.windows.net/public/mphs.png" border="0" width="200px"
									style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
							</a>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end logo -->

		<!-- start hero -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
							<h1
								style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
								Bayaran Tuntutan Anda</h1>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end hero -->

		<!-- start copy block -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Hi ${namaPertama}, Tuntutan anda untuk No. Rujukan ${referenceNo}
								telah dibayar sebanyak RM ${amaunBayaran} telah <b>DIBAYAR</b> oleh ${approverName} ke
								akaun
								bank anda. Sila klik pada butang di
								bawah untuk mengetahui
								lebih
								lanjut tentang maklumat tuntutan anda.</p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start button -->
					<tr>
						<td align="left" bgcolor="#ffffff">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
										<table border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
													<a href=${claimUrl} target="_blank"
														style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Lihat
														Tuntutan</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<!-- end button -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Jika butang di atas tidak berfungsi, anda boleh copy & paste url di
								bawah di browser anda:</p>
							<p style="margin: 0;"><a href=${claimUrl} target="_blank">Klik disini</a></p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
							<p style="margin: 0;">Terima kasih,<br> MPHS e-Perolehan</p>
						</td>
					</tr>
					<!-- end copy -->

				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end copy block -->

		<!-- start footer -->
		<tr>
			<td align="center" bgcolor="#e9ecef" style="padding: 24px;">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start permission -->
					<tr>
						<td align="center" bgcolor="#e9ecef"
							style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
							<p style="margin: 0;">Anda telah terima email ini kerana anda telah membuat tuntutan melalui
								MPHS e-Perolehan. Jika anda tidak membuat tuntutan, sila abaikan email ini.</p>
						</td>
					</tr>
					<!-- end permission -->
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end footer -->

	</table>
	<!-- end body -->

</body>

</html>`)

const requireApprovalTemplate = (referenceNo, pengesahan, namaPertama, amaunBayaran, claimUrl) => `<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>[MPHS-ePerolehan] [No. Rujukan ${referenceNo}] ${pengesahan} Tuntutan</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
		/**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
		@media screen {
			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 400;
				src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
			}

			@font-face {
				font-family: 'Source Sans Pro';
				font-style: normal;
				font-weight: 700;
				src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
			}
		}

		/**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
		body,
		table,
		td,
		a {
			-ms-text-size-adjust: 100%;
			/* 1 */
			-webkit-text-size-adjust: 100%;
			/* 2 */
		}

		/**
   * Remove extra space added to tables and cells in Outlook.
   */
		table,
		td {
			mso-table-rspace: 0pt;
			mso-table-lspace: 0pt;
		}

		/**
   * Better fluid images in Internet Explorer.
   */
		img {
			-ms-interpolation-mode: bicubic;
		}

		/**
   * Remove blue links for iOS devices.
   */
		a[x-apple-data-detectors] {
			font-family: inherit !important;
			font-size: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
			color: inherit !important;
			text-decoration: none !important;
		}

		/**
   * Fix centering issues in Android 4.4.
   */
		div[style*="margin: 16px 0;"] {
			margin: 0 !important;
		}

		body {
			width: 100% !important;
			height: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		/**
   * Collapse table borders to avoid space between cells.
   */
		table {
			border-collapse: collapse !important;
		}

		a {
			color: #1a82e2;
		}

		img {
			height: auto;
			line-height: 100%;
			text-decoration: none;
			border: 0;
			outline: none;
		}
	</style>

</head>

<body style="background-color: #e9ecef; padding-top: 50px !important;">

	<!-- start preheader -->
	<div class="preheader"
		style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
		${pengesahan} Tuntutan.
	</div>
	<!-- end preheader -->

	<!-- start body -->
	<table border="0" cellpadding="0" cellspacing="0" width="100%">

		<!-- start logo -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%"
					style="max-width: 600px; background: #ffffff;">
					<tr>
						<td align="center" valign="top">
							<a href="https://mphs.gov.my/" target="_blank" style="display: inline-block;">
								<img src="https://mdhs.blob.core.windows.net/public/mphs.png" border="0" width="200px"
									style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
							</a>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end logo -->

		<!-- start hero -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
							<h1
								style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
								${pengesahan} Tuntutan</h1>
						</td>
					</tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end hero -->

		<!-- start copy block -->
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Hi ${namaPertama}, tuntutan untuk No. Rujukan ${referenceNo}
								sebanyak RM ${amaunBayaran} memerlukan <b
									style="text-transform: uppercase;">${pengesahan}</b> anda. Sila klik pada butang
								di
								bawah untuk mengetahui
								lebih
								lanjut tentang maklumat tuntutan ini.</p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start button -->
					<tr>
						<td align="left" bgcolor="#ffffff">
							<table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
										<table border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
													<a href=${claimUrl} target="_blank"
														style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Lihat
														Tuntutan</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<!-- end button -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
							<p style="margin: 0;">Jika butang di atas tidak berfungsi, anda boleh copy & paste url di
								bawah di browser anda:</p>
							<p style="margin: 0;"><a href=${claimUrl} target="_blank">Klik disini</a></p>
						</td>
					</tr>
					<!-- end copy -->

					<!-- start copy -->
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
							<p style="margin: 0;">Terima kasih,<br> MPHS e-Perolehan</p>
						</td>
					</tr>
					<!-- end copy -->

				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end copy block -->

		<!-- start footer -->
		<tr>
			<td align="center" bgcolor="#e9ecef" style="padding: 24px;">
				<!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

					<!-- start permission -->
					<tr>
						<td align="center" bgcolor="#e9ecef"
							style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
							<p style="margin: 0;">Anda telah terima email ini kerana ${pengesahan} anda telah diperlukan
								untuk tuntutan ini melalui
								MPHS e-Perolehan.</p>
						</td>
					</tr>
					<!-- end permission -->
				</table>
				<!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
			</td>
		</tr>
		<!-- end footer -->

	</table>
	<!-- end body -->

</body>

</html>`

const forgotPasswordEmail = (nama, verificationUrl) => `<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>[MPHS-ePerolehan] Reset Kata Laluan Anda</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
        @media screen {
            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }

            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }

        /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
        body,
        table,
        td,
        a {
            -ms-text-size-adjust: 100%;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
        }

        /**
   * Remove extra space added to tables and cells in Outlook.
   */
        table,
        td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
        }

        /**
   * Better fluid images in Internet Explorer.
   */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /**
   * Remove blue links for iOS devices.
   */
        a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }

        /**
   * Fix centering issues in Android 4.4.
   */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /**
   * Collapse table borders to avoid space between cells.
   */
        table {
            border-collapse: collapse !important;
        }

        a {
            color: #1a82e2;
        }

        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>

</head>

<body style="background-color: #e9ecef; padding-top: 50px !important;">

    <!-- start preheader -->
    <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Reset Kata Laluan Anda.
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <!-- start logo -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px; background: #ffffff;">
                    <tr>
                        <td align="center" valign="top">
                            <a href="https://mphs.gov.my/" target="_blank"
                                style="display: inline-block; margin-top: 50px;">
                                <img src="https://mdhs.blob.core.windows.net/public/mphs.png" border="0" width="200px"
                                    style="display: block; width: 200px; max-width: 200px; min-width: 200px;">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <h1
                                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-align: center;">
                                Reset Kata Laluan Anda</h1>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Hi ${nama}, sila klik butang di bawah untuk menukar kata laluan akaun
                                anda.</p>
                        </td>
                    </tr>
                    <!-- end copy -->

                    <!-- start button -->
                    <tr>
                        <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                    <a href=${verificationUrl} target="_blank"
                                                        style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset
                                                        Kata Laluan</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- end button -->

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Jika butang di atas tidak berfungsi, anda boleh copy & paste url di
                                bawah di browser anda:</p>
                            <p style="margin: 0;"><a href=${verificationUrl} target="_blank">Klik disini</a></p>
                        </td>
                    </tr>
                    <!-- end copy -->

                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Terima kasih,<br> MPHS e-Perolehan</p>
                        </td>
                    </tr>
                    <!-- end copy -->

                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->
        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                    <!-- start permission -->
                    <tr>
                        <td align="center" bgcolor="#e9ecef"
                            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">Anda telah terima email ini kerana anda telah cuba menukar kata laluan
                                anda melalui MPHS e-Perolehan. Jika anda tidak berbuat demikian, sila hubungi Admin
                                sistem.
                            </p>
                        </td>
                    </tr>
                    <!-- end permission -->
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
        <!-- end footer -->

    </table>
    <!-- end body -->

</body>

</html>`

module.exports = {
	template,
	claimUpdateTemplate,
	paymentMadeTemplate,
	requireApprovalTemplate,
	forgotPasswordEmail
}