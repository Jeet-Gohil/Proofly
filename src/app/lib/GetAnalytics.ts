import pool from "./db";

export async function getSiteAnalytics(site_id: string) {
  try {
    const siteResult = await pool.query('SELECT * FROM sites WHERE site_id = $1', [site_id]);
    if (siteResult.rows.length === 0) {
      return { error: 'Site not found', status: 404 };
    }

    const visitsResult = await pool.query(
      'SELECT COUNT(*) AS total_visits FROM page_views WHERE site_id = $1',
      [site_id]
    );

    const usersResult = await pool.query(
      'SELECT COUNT(DISTINCT user_id) AS total_users FROM page_views WHERE site_id = $1',
      [site_id]
    );

    const activeUsersResult = await pool.query(
      `SELECT COUNT(DISTINCT session_id) AS active_users 
       FROM page_views 
       WHERE site_id = $1 AND timestamp >= NOW() - INTERVAL '5 minutes'`,
      [site_id]
    );

    return {
      site: siteResult.rows[0],
      total_visits: parseInt(visitsResult.rows[0].total_visits, 10),
      total_users: parseInt(usersResult.rows[0].total_users, 10),
      active_users: parseInt(activeUsersResult.rows[0].active_users, 10),
    };
  } catch (err) {
    console.error('Error fetching site analytics:', err);
    return { error: 'Internal server error', status: 500 };
  }
}
