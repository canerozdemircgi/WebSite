package com.canerozdemir.cgi.data;

import org.apache.commons.dbcp2.BasicDataSource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.MessageFormat;

public final class Database
{
	public static final BasicDataSource basicDataSource = new BasicDataSource();

	public static void Init()
	{
		String credentials = null;
		try
		{
			credentials = Files.readString(Paths.get("../../.exc/jdbc.pass"));
		}
		catch (final IOException ex)
		{
			Log.logger.fatal(ex);
			System.exit(0);
		}
		basicDataSource.setUrl(MessageFormat.format("jdbc:postgresql://{0}&sslmode=prefer", credentials));

		basicDataSource.setDefaultAutoCommit(false);
		basicDataSource.setAutoCommitOnReturn(false);

		basicDataSource.setInitialSize(4);
		basicDataSource.setMinIdle(16);
		basicDataSource.setMaxIdle(64);
		basicDataSource.setMaxTotal(256);

		basicDataSource.setPoolPreparedStatements(true);
		basicDataSource.setMaxOpenPreparedStatements(16);
	}
}